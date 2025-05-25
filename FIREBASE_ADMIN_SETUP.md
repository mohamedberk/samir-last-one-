# Firebase Admin SDK Setup for Production

## Overview

This document explains how to set up the Firebase Admin SDK for proper authentication in production. The Admin SDK is necessary for verifying Firebase ID tokens on the server side, which is required for secure access to admin pages and protected API routes.

## Steps to Configure Firebase Admin SDK in Production

### 1. Set Environment Variables in Vercel

In your Vercel project settings, add the following environment variables:

```
FIREBASE_PROJECT_ID=samir-6776e
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@samir-6776e.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCN4OmOrQRrp9i1\nb+WsFWtPlMi47hDfuUB7sKi5KRkHgev0FTueqkHI+qF9qdQ+vShqEl0GNq/LchUj\n+51nEiQeLwElb3s2jYXD/9Cr0HIbDpreXi8nuHpQa7bSaJYPhgzFYBI6uNff1qpI\nmI4I6qLHHBYPGuEni3LJXPozPNkgn1TcMTQ3/epkfYk0e4ffKfW+KZhhYXjw17dD\nHHGYi28CPV0RFkeqNr96OHIiJGbiP/0/4er3tuaf8mZ3X78oOuJTays3hWHgTTQ1\nWfW+1cEOM1E6Rwve3XJqkHkiGI1o1FtM9OD7Nqt12HOg/Z05PjwxzEdNaiLsQjj8\nkfw3VHh9AgMBAAECggEADLPLxVHZOPg8jzX29pquUmAsPl5WFWmlC83rtTQoQQNR\nSDeUcGam4CMMTU9kqL9PvHtrZ7CCubC7ks6mr4EwyaEEtcDO47n09XDUUmWlqaV7\nmRgOmbxK+yNBqYHimX4za4Jn72j4LtqtwTUjVkoHi9MIaI7MBLnX645O+kJi4Cgx\nksa3J2buR3ntV2xfiJpUFTCULTAEvwPBD3MkbXhzmssuuk9V8leyeSBnHarLfzBZ\nkC9Dwill3Pt1Nnuvdh1xhNsq8SAsaHn1Udm6y6vg16xaVVffrp+DRCfrXW/te7OR\nw2Hv/9qzsRSrn1sgVkFJ/pp/oHTibDqigonNBhElsQKBgQDDCrgDmhTS/zNu/Hld\ncU5jx1WEmM4GkLk3o8SLV8jQvo5CCfpvK51WUyIUElpg2RShht7UPxorlLBNkSx2\nA3iXr7aaI6vC1TOnSi7n68/cASxEgTts1npaDY9tZjdk+C6JdwGZ1UfbxJToxL8X\nORZS6Tb9mVeo9b6ClTWxzzr1FQKBgQC6OJo+KKws/yRp9Z2kyn2VK5H7wON3pzx9\nsZ2VB85qufmEEVZXsMSGgGzw38cuMrZEB69MrE08QougnQl396vcHHcqgxSFQFsz\ncQX72l37whWOctXeJNjmxS9QkRZeUVGom3ok15YLMRAHNITeYPGlcXya4RkXdoBG\n8WSOTQqfyQKBgDs5/Qjy+BHedwLj3gLXDmPUOw7Jy/5IYkYYD+30WUGyK8a3+vlZ\nOCznj7iinhk8sjwelXnEM7E6NJNJW0P2596/9+Y0oMrILShGqZm5jOQU4xlmWOJC\n+uJvrbcdzAJ4LsGFhtHs5yZAOqu4WwK1TicdNJqrvufKv/AtWSHGePPFAoGAZDio\nUoHDQChEqb4ljJXqBok/dPV3tmLL/H3F6HoeDnRupDRMer9I1XZyqyRUZzmlvHFC\nWAp3OtI5oURC30ztMnYjcD7BoYFkVAglB0mbwS3QOiz1iyvbjD9dWofrOPGc+BhN\nIVzhhL5v+OC8DY6xHrA4Noak4WrGWOf7jVZLPHkCgYEAwACxyDyaIfC0i3MEZBdR\nHNRcZQwvMmZMxckTTetUtxm/L/cYBC6Zk/tFE9YLWxGoBLzVaooyyJB1AS3m5RjR\nwbnkyS9WmIAcYpRTC9ggX3zfMYvWR6m2lo4pHHqnQ7ckkmg7N5IlsskNYaCyHFVR\nSxGkGdMxrT2eGiIt+nUVZ8A=\n-----END PRIVATE KEY-----\n"
```

**Important**: Make sure to properly escape the private key as shown above, with `\n` for line breaks.

### 2. Update Firebase Admin SDK File

Update the `src/lib/firebase/admin.ts` file to use environment variables instead of hardcoded values:

```typescript
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

// Rest of the file remains the same...
```

### 3. Set Admin Custom Claims

Run the script to set admin custom claims for your admin users:

```bash
# First, install ts-node if you haven't already
npm install -g ts-node

# Run the script
ts-node src/scripts/set-admin-claim.ts
```

This script will set the `admin` custom claim for the email addresses listed in the script.

## Troubleshooting

### Common Issues

1. **Token verification fails**: Make sure the environment variables are correctly set in Vercel.

2. **Admin access denied**: Ensure that the admin custom claim has been set for your admin users.

3. **Firebase initialization error**: Check that the Firebase Admin SDK is properly initialized before use.

### Debugging

To debug issues in production, check the Vercel logs for any error messages related to Firebase authentication or token verification.

## Security Considerations

1. **Never commit service account keys** to your repository. Always use environment variables.

2. **Restrict access** to the Firebase Admin SDK to only the necessary server-side code.

3. **Regularly rotate** your service account keys for enhanced security.

4. **Monitor authentication logs** in the Firebase Console for suspicious activity.