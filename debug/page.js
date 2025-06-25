// debug.js - Helper untuk debugging login issues
import { auth, db } from './firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

export const debugLogin = async (identifier, password) => {
  console.log('🐛 DEBUG: Starting login debug...');
  console.log('🐛 Identifier:', identifier);
  console.log('🐛 Password length:', password?.length);
  
  try {
    // Check if it's email or username
    const isEmail = identifier.includes('@');
    console.log('🐛 Is email?', isEmail);
    
    if (!isEmail) {
      // Debug username lookup
      console.log('🐛 Searching for username in Firestore...');
      const usersRef = collection(db, 'users');
      const allUsers = await getDocs(usersRef);
      
      console.log('🐛 Total users in database:', allUsers.size);
      
      allUsers.forEach(doc => {
        const data = doc.data();
        console.log('🐛 User found:', {
          id: doc.id,
          username: data.username,
          email: data.email,
          name: data.name
        });
      });
      
      // Check exact username match
      const matchingUser = allUsers.docs.find(doc => 
        doc.data().username === identifier.toLowerCase().trim()
      );
      
      if (matchingUser) {
        console.log('🐛 Matching user found:', matchingUser.data());
        return matchingUser.data().email;
      } else {
        console.log('🐛 No matching username found');
        return null;
      }
    }
    
    return identifier; // Return email as is
    
  } catch (error) {
    console.error('🐛 Debug error:', error);
    return null;
  }
};

// Test specific user
export const testUserData = async (userId) => {
  try {
    console.log('🐛 Testing user data for:', userId);
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (userDoc.exists()) {
      console.log('🐛 User data:', userDoc.data());
      return userDoc.data();
    } else {
      console.log('🐛 User document not found');
      return null;
    }
  } catch (error) {
    console.error('🐛 Error testing user data:', error);
    return null;
  }
};

// Check Firebase connection
export const checkFirebaseStatus = () => {
  console.log('🐛 Firebase Auth:', auth);
  console.log('🐛 Current user:', auth.currentUser);
  console.log('🐛 Firestore:', db);
};