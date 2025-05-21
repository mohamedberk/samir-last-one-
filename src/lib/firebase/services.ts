import { db } from './index'
import { collection, doc, getDoc, setDoc, runTransaction, query, where, getDocs } from 'firebase/firestore'
import type { Booking } from '@/types/booking'

interface BookingCounter {
  currentNumber: number
}

// Helper function to convert dates to Firestore format
const convertDatesToStrings = (data: any) => {
  const converted = { ...data };
  if (converted.date) {
    converted.date = converted.date.toISOString();
  }
  if (converted.airportTransfer?.date) {
    converted.airportTransfer.date = converted.airportTransfer.date.toISOString();
  }
  return converted;
};

// Helper function to convert Firestore dates back to Date objects
const convertStringsToDate = (data: any): Booking => {
  return {
    ...data,
    date: new Date(data.date),
    airportTransfer: data.airportTransfer ? {
      ...data.airportTransfer,
      date: new Date(data.airportTransfer.date)
    } : undefined,
    createdAt: new Date(data.createdAt),
    lastUpdated: new Date(data.lastUpdated)
  } as Booking;
};

// Booking Services
export async function getNextBookingNumber(): Promise<string> {
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

  return `TM-${newNumber.toString().padStart(4, '0')}`
}

export async function createBooking(bookingData: Omit<Booking, 'bookingNumber' | 'status' | 'createdAt' | 'lastUpdated'>) {
  const bookingNumber = await getNextBookingNumber()
  const timestamp = new Date().toISOString()
  
  const bookingRef = doc(db, 'bookings', bookingNumber)
  const firestoreData = convertDatesToStrings({
    ...bookingData,
    bookingNumber,
    status: 'pending',
    createdAt: timestamp,
    lastUpdated: timestamp
  });
  
  await setDoc(bookingRef, firestoreData)
  return bookingNumber
}

export async function getBooking(bookingNumber: string): Promise<Booking | null> {
  const bookingRef = doc(db, 'bookings', bookingNumber)
  const bookingDoc = await getDoc(bookingRef)
  
  if (!bookingDoc.exists()) {
    return null
  }

  return convertStringsToDate(bookingDoc.data());
}

// Admin Services
export async function getBookingsByStatus(status: Booking['status']) {
  const bookingsRef = collection(db, 'bookings')
  const q = query(bookingsRef, where('status', '==', status))
  const querySnapshot = await getDocs(q)
  
  return querySnapshot.docs.map(doc => convertStringsToDate(doc.data()));
}

export async function getBookingsByDateRange(startDate: Date, endDate: Date) {
  const bookingsRef = collection(db, 'bookings')
  const q = query(
    bookingsRef, 
    where('date', '>=', startDate.toISOString()),
    where('date', '<=', endDate.toISOString())
  )
  const querySnapshot = await getDocs(q)
  
  return querySnapshot.docs.map(doc => convertStringsToDate(doc.data()));
}

export const updateBooking = async (bookingId: string, data: Partial<Booking>) => {
  const bookingRef = doc(db, 'bookings', bookingId);
  const timestamp = new Date().toISOString();
  
  try {
    const firestoreData = convertDatesToStrings({
      ...data,
      lastUpdated: timestamp
    });
    await setDoc(bookingRef, firestoreData, { merge: true });
    return bookingId;
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
}; 