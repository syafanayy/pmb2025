// scripts/check-demo-users.js
// Run this to check if demo users exist
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB3Mql7T__ER-FceRKNCTRipUBmVz2rTxA",
  authDomain: "pmb2025-a6a04.firebaseapp.com",
  projectId: "pmb2025-a6a04",
  storageBucket: "pmb2025-a6a04.firebasestorage.app",
  messagingSenderId: "459444623615",
  appId: "1:459444623615:web:2f7a8b44c5cf4170fdd4ca"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const demoUsers = [
  { email: 'admin@hypezone.com', password: 'admin123' },
  { email: 'user1@hypezone.com', password: 'user123' },
  { email: 'johndoe@hypezone.com', password: 'john123' }
];

async function checkDemoUsers() {
  console.log('🔍 Checking demo users...\n');

  for (const user of demoUsers) {
    try {
      console.log(`🔄 Testing login: ${user.email}`);
      
      // Try to sign in
      const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
      const firebaseUser = userCredential.user;
      
      console.log(`✅ Login successful! UID: ${firebaseUser.uid}`);
      
      // Check Firestore document
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log(`✅ Firestore document exists:`, {
          username: userData.username,
          name: userData.name,
          role: userData.role,
          email: userData.email
        });
      } else {
        console.log(`❌ Firestore document NOT found for UID: ${firebaseUser.uid}`);
      }
      
      // Sign out for next test
      await auth.signOut();
      console.log('---');
      
    } catch (error) {
      console.log(`❌ Login failed for ${user.email}:`, error.code);
      if (error.code === 'auth/user-not-found') {
        console.log('   → User does not exist in Authentication');
      } else if (error.code === 'auth/wrong-password') {
        console.log('   → Wrong password');
      }
      console.log('---');
    }
  }

  // List all users in Firestore
  try {
    console.log('\n📋 Checking all users in Firestore...');
    const usersSnapshot = await getDocs(collection(db, 'users'));
    
    if (usersSnapshot.empty) {
      console.log('❌ No users found in Firestore users collection');
    } else {
      console.log(`✅ Found ${usersSnapshot.size} users in Firestore:`);
      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        console.log(`   • ${userData.email} (${userData.role}) - UID: ${doc.id}`);
      });
    }
  } catch (error) {
    console.log('❌ Error reading Firestore users:', error.message);
  }
}

checkDemoUsers().then(() => {
  console.log('\n🎉 Check complete!');
  process.exit(0);
}).catch(console.error);