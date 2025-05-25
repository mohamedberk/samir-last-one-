import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK if it hasn't been initialized already
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    console.log("Firebase Admin SDK initialized successfully");
  } catch (error) {
    console.error("Firebase Admin SDK initialization error:", error);
  }
}

// Function to verify a Firebase ID token
export async function verifyIdToken(token: string): Promise<admin.auth.DecodedIdToken> {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    throw error;
  }
}

// Function to set admin claim for a user
export async function setAdminClaim(email: string): Promise<void> {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`Admin claim set for user ${email}`);
  } catch (error) {
    console.error("Error setting admin claim:", error);
    throw error;
  }
}

export { admin };