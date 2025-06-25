// lib/auth.js - Enhanced Authentication Service
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db } from './firebase';

// Enhanced error handling
const handleAuthError = (error) => {
  console.error('🔥 Firebase Auth Error:', error);
  
  // Common Firebase Auth error codes
  const errorMessages = {
    'auth/user-not-found': 'User tidak ditemukan',
    'auth/wrong-password': 'Password salah',
    'auth/invalid-email': 'Format email tidak valid',
    'auth/user-disabled': 'Akun telah dinonaktifkan',
    'auth/too-many-requests': 'Terlalu banyak percobaan. Coba lagi nanti',
    'auth/invalid-credential': 'Username atau password salah',
    'auth/network-request-failed': 'Masalah koneksi internet',
    'permission-denied': 'Tidak memiliki izin akses',
    'unavailable': 'Layanan tidak tersedia sementara',
    'auth/missing-password': 'Password harus diisi'
  };

  // Check for specific error codes
  for (const [code, message] of Object.entries(errorMessages)) {
    if (error.code === code || error.message.includes(code)) {
      return message;
    }
  }

  // Return original message if no match found
  return error.message || 'Terjadi kesalahan tidak dikenal';
};

// Login with email/password
export const loginWithEmail = async (email, password) => {
  try {
    console.log('🔄 Attempting email login for:', email);
    
    // Validate inputs
    if (!email || !password) {
      throw new Error('Email dan password harus diisi');
    }
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('✅ Firebase Auth successful for:', user.email);
    
    // Get user data from Firestore with retry mechanism
    let userDoc = null;
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount < maxRetries && !userDoc) {
      try {
        console.log(`🔄 Fetching user data (attempt ${retryCount + 1})`);
        userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          console.log('✅ User document found');
          break;
        } else {
          console.warn('⚠️ User document not found in Firestore');
          throw new Error('User data not found in database');
        }
      } catch (firestoreError) {
        retryCount++;
        console.error(`❌ Firestore error (attempt ${retryCount}):`, firestoreError);
        
        if (retryCount >= maxRetries) {
          throw new Error('Failed to fetch user data after multiple attempts');
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    if (userDoc && userDoc.exists()) {
      const userData = {
        uid: user.uid,
        email: user.email,
        ...userDoc.data()
      };
      
      // Update last login
      try {
        await updateLastLogin(user.uid);
      } catch (updateError) {
        console.warn('⚠️ Failed to update last login:', updateError);
        // Don't fail login for this
      }
      
      return {
        success: true,
        user: userData
      };
    } else {
      throw new Error('User document not found');
    }
    
  } catch (error) {
    console.error('❌ Email login failed:', error);
    return {
      success: false,
      error: handleAuthError(error)
    };
  }
};

// Login with username (search in Firestore first)
export const loginWithUsername = async (username, password) => {
  try {
    console.log('🔄 Attempting username login for:', username);
    
    // Validate inputs
    if (!username || !password) {
      throw new Error('Username dan password harus diisi');
    }
    
    // Search for user by username in Firestore
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username.toLowerCase().trim()));
    
    console.log('🔍 Searching for username in Firestore...');
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn('⚠️ Username not found in Firestore');
      throw new Error('Username tidak ditemukan');
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    console.log('✅ Username found:', userData.email);

    if (!userData.email) {
      throw new Error('Data user tidak memiliki email');
    }

    // Use email to login with Firebase Auth
    console.log('🔄 Logging in with email:', userData.email);
    const userCredential = await signInWithEmailAndPassword(auth, userData.email, password);
    
    console.log('✅ Firebase Auth successful');
    
    // Update last login
    try {
      await updateLastLogin(userCredential.user.uid);
    } catch (updateError) {
      console.warn('⚠️ Failed to update last login:', updateError);
    }
    
    return {
      success: true,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        ...userData
      }
    };
    
  } catch (error) {
    console.error('❌ Username login failed:', error);
    return {
      success: false,
      error: handleAuthError(error)
    };
  }
};

// Register new user
export const registerUser = async (userData) => {
  try {
    const { email, password, username, name, role = 'user' } = userData;
    
    console.log('🔄 Registering new user:', { email, username, name, role });
    
    // Validate inputs
    if (!email || !password || !username || !name) {
      throw new Error('Semua field harus diisi');
    }
    
    // Check if username already exists (case insensitive)
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username.toLowerCase().trim()));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      throw new Error('Username sudah digunakan');
    }
    
    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('✅ Firebase Auth user created:', user.uid);
    
    // Save user data to Firestore
    const userDocData = {
      username: username.toLowerCase().trim(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    };
    
    await setDoc(doc(db, 'users', user.uid), userDocData);
    console.log('✅ User data saved to Firestore');
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        username: userDocData.username,
        name: userDocData.name,
        role
      }
    };
  } catch (error) {
    console.error('❌ Registration failed:', error);
    return {
      success: false,
      error: handleAuthError(error)
    };
  }
};

// Logout
export const logout = async () => {
  try {
    console.log('🔄 Logging out...');
    await signOut(auth);
    console.log('✅ Logout successful');
    return { success: true };
  } catch (error) {
    console.error('❌ Logout failed:', error);
    return {
      success: false,
      error: handleAuthError(error)
    };
  }
};

// Get current user data
export const getCurrentUser = async () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            resolve({
              uid: user.uid,
              email: user.email,
              ...userDoc.data()
            });
          } else {
            console.warn('⚠️ User document not found');
            resolve(null);
          }
        } catch (error) {
          console.error('❌ Error fetching current user:', error);
          resolve(null);
        }
      } else {
        resolve(null);
      }
      unsubscribe();
    });
  });
};

// Update last login
export const updateLastLogin = async (uid) => {
  try {
    console.log('🔄 Updating last login for:', uid);
    await setDoc(doc(db, 'users', uid), {
      lastLogin: serverTimestamp()
    }, { merge: true });
    console.log('✅ Last login updated');
  } catch (error) {
    console.error('❌ Error updating last login:', error);
    throw error;
  }
};

// Test Firebase connection
export const testFirebaseConnection = async () => {
  try {
    console.log('🔄 Testing Firebase connection...');
    
    // Test Auth
    const authUser = auth.currentUser;
    console.log('Auth status:', authUser ? 'Authenticated' : 'Not authenticated');
    
    // Test Firestore with a simple read
    const testDoc = doc(db, 'test', 'connection');
    await getDoc(testDoc);
    console.log('✅ Firestore connection successful');
    
    return { success: true };
  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
    return { 
      success: false, 
      error: handleAuthError(error) 
    };
  }
};