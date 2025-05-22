# Firebase Setup for VIP Marrakech Trips

This document explains how to set up Firebase for the VIP Marrakech Trips booking system.

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "VIP Marrakech Trips")
4. Follow the setup wizard to create your project

## 2. Set up Firestore Database

1. In your Firebase project, go to **Firestore Database** in the sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development (change rules before production)
4. Select a location closest to your users
5. Click "Enable"

## 3. Register Your Web App

1. In your Firebase project, click the web icon (</>) on the Project Overview page
2. Register your app with a nickname (e.g., "VIP Marrakech Trips Web")
3. Copy the Firebase configuration object that looks like:

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "..."
};
```

## 4. Create Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

Replace the placeholder values with the actual values from your Firebase configuration.

## 5. Create the Required Firestore Collections

### Bookings Collection

The booking system uses a `bookings` collection to store booking information. Each document in the collection represents a booking with the document ID as the booking reference.

### Counters Collection

The system also uses a `counters` collection with a `bookings` document to keep track of booking numbers:

1. Go to Firestore Database
2. Create a collection named `counters`
3. Add a document with ID `bookings`
4. Add a field `currentNumber` with a value of `1` (number type)

## 6. Set up Firestore Rules for Production

Before deploying to production, update the Firestore security rules to restrict access:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Bookings collection rules
    match /bookings/{bookingId} {
      // Anyone can create a booking
      allow create;
      
      // Only read your own booking (using the booking reference)
      allow read: if request.auth != null || request.query.limit == 1;
      
      // Only admins can update or delete bookings
      allow update, delete: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Counters collection (restricted to admin access)
    match /counters/{counterId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Additional Notes

- The booking system automatically generates references in the format `MRT-XXXXXX` using an atomic counter in Firestore.
- For production deployment, consider implementing Firebase Authentication for admin functions.
- Consider implementing proper error handling and retries for Firestore operations. 