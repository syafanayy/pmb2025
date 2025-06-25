// lib/firebase.js - Clean configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - using hardcoded values for reliability
const firebaseConfig = {
  apiKey: "AIzaSyB3Mql7T__ER-FceRKNCTRipUBmVz2rTxA",
  authDomain: "pmb2025-a6a04.firebaseapp.com",
  projectId: "pmb2025-a6a04",
  storageBucket: "pmb2025-a6a04.firebasestorage.app",
  messagingSenderId: "459444623615",
  appId: "1:459444623615:web:2f7a8b44c5cf4170fdd4ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Debug log
console.log('🔥 Firebase initialized successfully');

export default app;