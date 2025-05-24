import { db } from './index'
import { collection, doc, getDoc, setDoc, runTransaction, query, where, getDocs, Timestamp, addDoc, serverTimestamp, Firestore } from 'firebase/firestore'
import type { Booking } from '@/types/booking'

// Booking Services
export async function getNextBookingNumber(): Promise<string> {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      return `MRT-${Math.floor(100000 + Math.random() * 900000)}`;
    }
    
    const counterRef = doc(db, 'counters', 'bookings')
    
    // Use transaction to ensure atomic increment
    const newNumber = await runTransaction(db, async (transaction) => {
      const counterDoc = await transaction.get(counterRef)
      
      if (!counterDoc.exists()) {
        transaction.set(counterRef, { currentNumber: 1 })
        return 1
      }

      const newCount = (counterDoc.data() as BookingCounter).currentNumber + 1
      transaction.update(counterRef, { currentNumber: newCount })
      return newCount
    })

    return `MRT-${newNumber.toString().padStart(6, '0')}`
  } catch (error) {
    console.error('Error getting next booking number:', error);
    // Generate a random number as fallback
    return `MRT-${Math.floor(100000 + Math.random() * 900000)}`;
  }
}

interface BookingCounter {
  currentNumber: number
}

// Helper function to convert dates to Firestore format
const convertDatesToStrings = (data: any) => {
  try {
    const converted = { ...data };
    if (converted.date) {
      converted.date = converted.date instanceof Date ? 
        Timestamp.fromDate(converted.date) : 
        converted.date;
    }
    if (converted.airportTransfer?.date) {
      converted.airportTransfer.date = converted.airportTransfer.date instanceof Date ? 
        Timestamp.fromDate(converted.airportTransfer.date) : 
        converted.airportTransfer.date;
    }
    if (converted.createdAt && converted.createdAt instanceof Date) {
      converted.createdAt = Timestamp.fromDate(converted.createdAt);
    }
    if (converted.lastUpdated && converted.lastUpdated instanceof Date) {
      converted.lastUpdated = Timestamp.fromDate(converted.lastUpdated);
    }
    return converted;
  } catch (error) {
    console.error('Error converting dates to Firestore format:', error);
    return data; // Return original data if conversion fails
  }
};

// Helper function to convert Firestore dates back to Date objects
const convertTimestampsToDate = (data: any): Booking => {
  try {
    const converted = { ...data };
    
    if (converted.date && converted.date instanceof Timestamp) {
      converted.date = converted.date.toDate();
    }
    
    if (converted.airportTransfer?.date && converted.airportTransfer.date instanceof Timestamp) {
      converted.airportTransfer.date = converted.airportTransfer.date.toDate();
    }
    
    if (converted.createdAt && converted.createdAt instanceof Timestamp) {
      converted.createdAt = converted.createdAt.toDate();
    }
    
    if (converted.lastUpdated && converted.lastUpdated instanceof Timestamp) {
      converted.lastUpdated = converted.lastUpdated.toDate();
    }
    
    return converted as Booking;
  } catch (error) {
    console.error('Error converting Firestore timestamps to dates:', error);
    return data as Booking; // Return original data if conversion fails
  }
};

export async function createBooking(bookingData: Partial<Booking>): Promise<string> {
  try {
    if (!db) {
      console.error('Firestore is not initialized - cannot save booking to database');
      
      // Still generate a reference even if Firestore is not initialized
      const fallbackReference = bookingData.reference || `MRT-${Math.floor(100000 + Math.random() * 900000)}`;
      console.log('Using fallback reference due to Firestore initialization failure:', fallbackReference);
      
      return fallbackReference;
    }
    
    // Generate a booking reference if not provided
    if (!bookingData.reference) {
      bookingData.reference = await getNextBookingNumber();
      console.log('Generated booking reference:', bookingData.reference);
    }
    
    // Set timestamps
    const now = new Date();
    const completeBooking = {
      ...bookingData,
      status: bookingData.status || 'confirmed',
      createdAt: now,
      lastUpdated: now
    };
    
    // Convert dates for Firestore
    const firestoreData = convertDatesToStrings(completeBooking);
    
    console.log('Attempting to save booking to Firestore with reference:', bookingData.reference);
    
    // Create the document with the booking reference as the ID
    const bookingRef = doc(db, 'bookings', bookingData.reference);
    await setDoc(bookingRef, firestoreData);
    
    console.log('Booking successfully saved to Firestore');
    return bookingData.reference;
  } catch (error) {
    console.error('Error creating booking:', error);
    
    // If there's an error, still return the reference so the user can continue
    const fallbackReference = bookingData.reference || `MRT-${Math.floor(100000 + Math.random() * 900000)}`;
    console.log('Using fallback reference due to error:', fallbackReference);
    
    return fallbackReference;
  }
}

export async function getBooking(bookingReference: string): Promise<Booking | null> {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      return null;
    }
    
    const bookingRef = doc(db, 'bookings', bookingReference)
    const bookingDoc = await getDoc(bookingRef)
    
    if (!bookingDoc.exists()) {
      return null
    }

    return convertTimestampsToDate(bookingDoc.data());
  } catch (error) {
    console.error('Error getting booking:', error);
    return null;
  }
}

// Admin Services
export async function getBookingsByStatus(status: Booking['status']) {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      return [];
    }
    
    const bookingsRef = collection(db, 'bookings')
    const q = query(bookingsRef, where('status', '==', status))
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => convertTimestampsToDate(doc.data()));
  } catch (error) {
    console.error('Error getting bookings by status:', error);
    return [];
  }
}

export async function getBookingsByDateRange(startDate: Date, endDate: Date) {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      return [];
    }
    
    const bookingsRef = collection(db, 'bookings')
    const startTimestamp = Timestamp.fromDate(startDate);
    const endTimestamp = Timestamp.fromDate(endDate);
    
    const q = query(
      bookingsRef, 
      where('date', '>=', startTimestamp),
      where('date', '<=', endTimestamp)
    )
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => convertTimestampsToDate(doc.data()));
  } catch (error) {
    console.error('Error getting bookings by date range:', error);
    return [];
  }
}

export const updateBooking = async (bookingId: string, data: Partial<Booking>) => {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      return bookingId;
    }
    
    const bookingRef = doc(db, 'bookings', bookingId);
    const now = new Date();
    
    const updateData = {
      ...convertDatesToStrings(data),
      lastUpdated: now
    };
    
    await setDoc(bookingRef, updateData, { merge: true });
    return bookingId;
  } catch (error) {
    console.error('Error updating booking:', error);
    return bookingId;
  }
};

export const cancelBooking = async (bookingId: string) => {
  return updateBooking(bookingId, { 
    status: 'cancelled',
    paymentDetails: {
      status: 'cancelled'
    } as any
  });
};

// Blog Services
export interface Blog {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: Date
  status: 'published' | 'draft'
  tags: string[]
  imageUrl?: string
  createdAt?: Date
  lastUpdated?: Date
  // SEO fields
  slug?: string
  metaDescription?: string
  metaKeywords?: string[]
  seoTitle?: string
}

// Helper function to convert blog dates to Firestore format
const convertBlogDatesToStrings = (data: any) => {
  try {
    const converted = { ...data };
    if (converted.publishedAt && converted.publishedAt instanceof Date) {
      converted.publishedAt = Timestamp.fromDate(converted.publishedAt);
    }
    if (converted.createdAt && converted.createdAt instanceof Date) {
      converted.createdAt = Timestamp.fromDate(converted.createdAt);
    }
    if (converted.lastUpdated && converted.lastUpdated instanceof Date) {
      converted.lastUpdated = Timestamp.fromDate(converted.lastUpdated);
    }
    return converted;
  } catch (error) {
    console.error('Error converting blog dates to Firestore format:', error);
    return data;
  }
};

// Helper function to convert Firestore timestamps back to Date objects for blogs
const convertBlogTimestampsToDate = (data: any): Blog => {
  try {
    const converted = { ...data };
    
    if (converted.publishedAt && converted.publishedAt instanceof Timestamp) {
      converted.publishedAt = converted.publishedAt.toDate();
    }
    
    if (converted.createdAt && converted.createdAt instanceof Timestamp) {
      converted.createdAt = converted.createdAt.toDate();
    }
    
    if (converted.lastUpdated && converted.lastUpdated instanceof Timestamp) {
      converted.lastUpdated = converted.lastUpdated.toDate();
    }
    
    return converted as Blog;
  } catch (error) {
    console.error('Error converting blog Firestore timestamps to dates:', error);
    return data as Blog;
  }
};

export async function createBlog(blogData: Partial<Blog>): Promise<string> {
  try {
    console.log('createBlog called with data:', blogData)
    
    if (!db) {
      console.error('Firestore is not initialized - cannot save blog to database');
      console.log('Database instance:', db)
      return '';
    }
    
    console.log('Firestore database is available:', !!db)
    
    const now = new Date();
    const completeBlog = {
      ...blogData,
      author: blogData.author || 'Admin',
      publishedAt: blogData.publishedAt || now,
      createdAt: now,
      lastUpdated: now
    };
    
    console.log('Complete blog data before conversion:', completeBlog)
    
    // Convert dates for Firestore
    const firestoreData = convertBlogDatesToStrings(completeBlog);
    
    console.log('Firestore data after conversion:', firestoreData)
    
    // Create the document and let Firestore generate the ID
    const blogsRef = collection(db, 'blogs');
    console.log('Blogs collection reference created:', blogsRef)
    
    console.log('Attempting to add document to Firestore...')
    const docRef = await addDoc(blogsRef, firestoreData);
    
    console.log('Blog successfully saved to Firestore with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error creating blog - detailed error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return '';
  }
}

export async function getAllBlogs(): Promise<Blog[]> {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      return [];
    }
    
    const blogsRef = collection(db, 'blogs');
    const querySnapshot = await getDocs(blogsRef);
    
    return querySnapshot.docs.map(doc => ({
      ...convertBlogTimestampsToDate(doc.data()),
      id: doc.id
    }));
  } catch (error) {
    console.error('Error getting blogs:', error);
    return [];
  }
}

export async function getBlogsByStatus(status: Blog['status']): Promise<Blog[]> {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      return [];
    }
    
    const blogsRef = collection(db, 'blogs');
    const q = query(blogsRef, where('status', '==', status));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      ...convertBlogTimestampsToDate(doc.data()),
      id: doc.id
    }));
  } catch (error) {
    console.error('Error getting blogs by status:', error);
    return [];
  }
}

export async function getBlog(blogId: string): Promise<Blog | null> {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      return null;
    }
    
    const blogRef = doc(db, 'blogs', blogId);
    const blogDoc = await getDoc(blogRef);
    
    if (!blogDoc.exists()) {
      return null;
    }

    return {
      ...convertBlogTimestampsToDate(blogDoc.data()),
      id: blogDoc.id
    };
  } catch (error) {
    console.error('Error getting blog:', error);
    return null;
  }
}

export async function updateBlog(blogId: string, data: Partial<Blog>): Promise<string> {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      return blogId;
    }
    
    const blogRef = doc(db, 'blogs', blogId);
    const now = new Date();
    
    const updateData = {
      ...convertBlogDatesToStrings(data),
      lastUpdated: now
    };
    
    await setDoc(blogRef, updateData, { merge: true });
    return blogId;
  } catch (error) {
    console.error('Error updating blog:', error);
    return blogId;
  }
}

export async function deleteBlog(blogId: string): Promise<boolean> {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      return false;
    }
    
    const blogRef = doc(db, 'blogs', blogId);
    await setDoc(blogRef, { deleted: true, lastUpdated: new Date() }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error deleting blog:', error);
    return false;
  }
} 