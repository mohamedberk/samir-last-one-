import { setAdminClaim } from '../lib/firebase/admin.js';

// List of admin emails that should have the admin claim
const adminEmails = [
  'medelberkaoui2001@gmail.com',
  // Add more admin emails here as needed
];

async function setAdminClaims() {
  try {
    console.log('Setting admin claims for users...');
    
    for (const email of adminEmails) {
      try {
        await setAdminClaim(email);
        console.log(`✅ Admin claim set for ${email}`);
      } catch (error) {
        console.error(`❌ Failed to set admin claim for ${email}:`, error);
      }
    }
    
    console.log('Admin claims setup complete!');
  } catch (error) {
    console.error('Error in setAdminClaims:', error);
  }
}

// Run the function
setAdminClaims();