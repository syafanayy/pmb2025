// scripts/manual-firestore-setup.js
// Run this to manually add user data to Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB3Mql7T__ER-FceRKNCTRipUBmVz2rTxA",
  authDomain: "pmb2025-a6a04.firebaseapp.com",
  projectId: "pmb2025-a6a04",
  storageBucket: "pmb2025-a6a04.firebasestorage.app",
  messagingSenderId: "459444623615",
  appId: "1:459444623615:web:2f7a8b44c5cf4170fdd4ca"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// User data dengan UID dari Firebase Authentication
const userData = [
  {
    uid: "v31wsSHhXFWIY2QdhSTTDI...", // UID admin dari screenshot
    email: "admin@hypezone.com",
    username: "admin",
    name: "Administrator",
    role: "admin"
  },
  {
    uid: "k7MpEYV1odPzzG8mQgfwYrt...", // UID user1 dari screenshot  
    email: "user1@hypezone.com",
    username: "user1",
    name: "Regular User",
    role: "user"
  },
  {
    uid: "0iykCNwUNFgvbqnBjS3fGHVQ...", // UID johndoe dari screenshot
    email: "johndoe@hypezone.com", 
    username: "johndoe",
    name: "John Doe",
    role: "user"
  }
];

async function setupFirestoreUsers() {
  console.log('🔄 Setting up Firestore user documents...\n');

  for (const user of userData) {
    try {
      console.log(`🔄 Creating document for: ${user.email}`);
      
      await setDoc(doc(db, 'users', user.uid), {
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });
      
      console.log(`✅ Document created for: ${user.email}`);
    } catch (error) {
      console.error(`❌ Error creating document for ${user.email}:`, error);
    }
  }

  console.log('\n🎉 Firestore setup complete!');
}

setupFirestoreUsers().catch(console.error);