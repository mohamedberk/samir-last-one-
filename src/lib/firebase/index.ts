import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getAuth, Auth } from 'firebase/auth'

// Default configuration for development/testing
const defaultConfig = {
  apiKey: "AIzaSyA-test-key-for-development-only",
  authDomain: "test-project.firebaseapp.com",
  projectId: "test-project",
  storageBucket: "test-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789",
  measurementId: "G-ABCDEFGHI",
};

// Use environment variables if available, otherwise use default config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || defaultConfig.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || defaultConfig.authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || defaultConfig.projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || defaultConfig.storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || defaultConfig.messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || defaultConfig.appId,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || defaultConfig.measurementId,
};

// Log the environment check to help with debugging
console.log("Firebase environment check:", {
  apiKeySet: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomainSet: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectIdSet: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  usingDefaultConfig: !process.env.NEXT_PUBLIC_FIREBASE_API_KEY
});

// Initialize Firebase only if it hasn't been initialized already
let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  console.log("Firebase app initialized successfully");
  
  db = getFirestore(app);
  console.log("Firestore initialized successfully");
  
  auth = getAuth(app);
  console.log("Firebase auth initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { app, db, auth }

// Export all Firebase services
export * from './services' 