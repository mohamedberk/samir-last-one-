### Overview

Build a modern, super-responsive website for a travel agency. The website will showcase tours and activities, 
allowing clients to browse options and make bookings directly on the site. The website must be clean, 
visually appealing, and functional on all devices. Use Firebase for database and authentication, and Vercel for 
deployment and API routes. Incorporate ShadCN components for a sleek design.

### Features
1. **Homepage**
   - Eye-catching hero section with a welcoming message and a high-quality image.
   - Highlights of popular tours/activities.
   - Navigation bar with links to all key pages (e.g., Tours, About, Contact).

2. **Tours and Activities Page**
   - Displays all available tours/activities in a grid layout.
   - Each item should include:
     - A thumbnail image.
     - Title and a short description.
     - Price (formatted dynamically).
     - A button to "View Details."

3. **Single Tour/Activity Page**
   - Template for all tours/activities with these elements:
     - High-quality image at the top.
     - Tour highlights (use a bullet list).
     - A short description.
     - Price and details (e.g., per person or group).
     - A "Book Now" button.

4. **Booking Feature**
   - The "Book Now" button opens a **calendar popup**.
   - Calendar should allow clients to:
     - Select a date.
     - Provide necessary details (e.g., number of people, name, email, and phone).
     - Submit the booking, which saves to Firebase.

5. **Authentication**
   - Include Firebase authentication for user logins.
   - Allow users to create accounts and view their bookings.

6. **Responsive Design**
   - Ensure the website works seamlessly on all devices (desktop, tablet, mobile).
   - Test responsiveness thoroughly.

7. **Backend Functionality**
   - Use **Vercel API Routes** to handle backend processes like:
     - Booking submissions (saving to Firebase).
     - Fetching tour data.

### Tech Stack
- **Frontend**: React.js with Next.js (for server-side rendering and modern routing).
- **Styling**: Tailwind CSS + ShadCN components for a clean, modern UI.
- **Backend**: Node.js with Firebase integration.
- **Database**: Firebase Firestore.
- **Authentication**: Firebase Auth (email/password and social login options).
- **Deployment**: Vercel for hosting and serverless functions.

### Page Structure
1. **Home Page (`/`)**
   - Hero section.
   - Featured tours/activities.
   - Footer with social links and contact info.

2. **Tours Page (`/tours`)**
   - Grid layout displaying all tours and activities.

3. **Single Tour Page (`/tours/[id]`)**
   - Dynamic route for individual tours.
   - Includes all details outlined above.

4. **Booking Page (Popup on `/tours/[id]`)**
   - Calendar for date selection.
   - Client information form.

5. **Authentication (`/login`, `/register`)**
   - User-friendly forms for sign-up and login.

### Design Guidelines
- Use ShadCN components for consistency and elegance.
- Keep layouts minimal but functional.
- Use Tailwind CSS utilities for responsiveness.
- Add subtle animations/transitions for interactivity (e.g., hover effects on buttons).

### Example Workflow
1. Fetch tours/activities data from Firebase Firestore.
2. Display data dynamically on `/tours`.
3. Handle user interaction:
   - Clicking a tour opens its dynamic page (`/tours/[id]`).
   - On that page, the "Book Now" button opens the calendar popup.
4. Store bookings in Firestore and authenticate users with Firebase Auth.

### Deployment
1. Deploy the app to **Vercel** for production.
2. Set up Firebase Firestore rules for secure access.
3. Use Vercel’s serverless functions for API routes.