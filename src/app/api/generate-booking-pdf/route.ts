import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit/js/pdfkit.standalone.js';
import { format } from 'date-fns';
import { calculateTotalPrice, formatPrice, parsePriceString } from '@/lib/utils/price-calculator';
import { Activity } from '@/types/activity';

export const runtime = 'nodejs';

// Format a date with fallbacks for different date formats
const formatDate = (date: any) => {
  if (!date) return 'TBD';
  try {
    // Handle Firestore timestamp object
    if (date.seconds) {
      return format(new Date(date.seconds * 1000), 'EEEE, MMMM d, yyyy');
    }
    // Handle regular date object or string
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return format(dateObj, 'EEEE, MMMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', date, error);
    return 'TBD';
  }
};

// Format a time with fallbacks
const formatTime = (time: string) => {
  if (!time) return 'TBD';
  return time;
};

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json();
    
    if (!bookingData) {
      throw new Error('Missing booking data');
    }

    // Color scheme - desert/Morocco inspired
    const colors = {
      primary: '#F97316',       // Orange-500 (highlight-primary)
      primaryLight: '#FDBA74',  // Orange-300 (highlight-accent)
      secondary: '#3B82F6',     // Blue-500 (brand)
      dark: '#111827',          // Gray-900
      gray: '#6B7280',          // Gray-500
      lightGray: '#E5E7EB',     // Gray-200
      surface: '#F8FAFC',       // Slate-50
      white: '#FFFFFF',
      sand: '#F5F5DC',          // Light sand color
    };

    // Calculate the total price using our consistent calculator
    let finalTotal = 0;

    // If we already have totalAmount in paymentDetails, use that
    if (bookingData.paymentDetails?.totalAmount) {
      finalTotal = parsePriceString(bookingData.paymentDetails.totalAmount);
    } 
    // Otherwise calculate it
    else {
      // Map booking activities to the format needed by calculator
      const activities = bookingData.activities.map((activity: any) => {
        // Minimal activity object with required properties
        return {
          id: activity.id,
          title: activity.name,
          slug: activity.id === 2 ? 'chez-ali' : '',
          options: {
            group: {
              price: activity.basePrice || 0,
              childPrice: activity.childPrice || 0,
              perPerson: true
            },
            private: {
              price: 0,
              childPrice: 0,
              perPerson: false,
              privateTierPricing: {
                tier1: { price: 0, maxPeople: 6 },
                tier2: { price: 0, maxPeople: 17 }
              }
            }
          },
          menuOptions: bookingData.metadata?.isChezAli ? {
            tagineMenu: { price: 48 },
            mechouiMenu: { price: 60 }
          } : undefined
        } as Activity;
      });

      // Calculate using our utility
      const priceResult = calculateTotalPrice({
        activities,
        tourType: bookingData.tourType || 'group',
        guests: bookingData.guests,
        airportPickup: bookingData.airportTransfer ? {
          enabled: true,
          city: bookingData.airportTransfer.city,
        } : undefined,
        isChezAli: bookingData.metadata?.isChezAli,
        selectedMenu: bookingData.metadata?.selectedMenu
      });

      finalTotal = priceResult.totalAmount;
    }

    // Create PDF document
    const doc = new PDFDocument({
      size: 'A4',
      margin: 40,
      bufferPages: true, // Enable page buffering for adding page numbers
      info: {
        Title: `VIP Marrakech Trips - Booking ${bookingData.reference}`,
        Author: 'VIP Marrakech Trips',
        Subject: 'Travel Booking Receipt',
        Keywords: 'morocco, marrakech, travel, booking, receipt',
        Creator: 'VIP Marrakech Trips Booking System',
      }
    });
    
    // Register a custom font if available (fallback to Helvetica)
    try {
      doc.registerFont('DM Sans', 'fonts/DMSans-Regular.ttf');
      doc.registerFont('DM Sans Bold', 'fonts/DMSans-Bold.ttf');
      doc.font('DM Sans');
    } catch (e) {
      // Silently continue with default font
    }

    // Create a subtle background for the entire document
    const createBackgroundPattern = () => {
      // Set very light background color for the page
      doc
        .rect(0, 0, doc.page.width, doc.page.height)
        .fill('#FFFAF5');
      
      // Create subtle pattern at the top
      doc.save();
      
      // Top right decorative element
      doc.circle(doc.page.width, 0, 120)
        .fillOpacity(0.05)
        .fill(colors.primary);
      
      // Bottom left decorative element
      doc.circle(0, doc.page.height, 120)
        .fillOpacity(0.05)
        .fill(colors.secondary);
      
      doc.restore();
    };

    // Add a decorative header
    const addHeader = () => {
      // Apply subtle background pattern
      createBackgroundPattern();
      
      // Background shape
      doc
        .save()
        .translate(0, 0)
        .path('M 0,0 L 595.28,0 L 595.28,160 Q 297.64,130 0,160 Z') // Create a wave shape
        .fillOpacity(0.1)
        .fill(colors.primary)
        .restore();
        
      // Logo and branding
      doc
        .fillColor(colors.dark)
        .fontSize(30)
        .font('Helvetica-Bold')
        .text('VIP MARRAKECH', 40, 40);
      
      doc
        .fontSize(28)
        .font('Helvetica')
        .fillColor(colors.primary)
        .text('TRIPS', 40, 70);
      
      // Add a decorative element
      doc
        .save()
        .translate(40, 105)
        .rect(0, 0, 60, 3)
        .fill(colors.primary)
        .restore();
      
      // Add booking receipt title and reference number
      doc
        .fontSize(12)
        .fillColor(colors.gray)
        .text('BOOKING RECEIPT', 40, 120);
      
      doc
        .fontSize(14)
        .fillColor(colors.dark)
        .text(`Reference: ${bookingData.reference}`, 40, 140)
        .moveDown(1);
    };

    // Add customer info section with improved spacing
    const addCustomerInfo = (y: number) => {
      // Create a background rectangle with subtle shadow effect
      doc
        .save()
        .roundedRect(40, y, 515, 130, 8)
        .fillOpacity(0.5)
        .fillAndStroke(colors.surface, colors.lightGray)
        .restore();
      
      // Customer Info Header
      doc
        .fillColor(colors.dark)
        .fontSize(16)
        .text('Customer Details', 60, y + 20);
      
      // Divider line
      doc
        .moveTo(60, y + 40)
        .lineTo(535, y + 40)
        .strokeColor(colors.lightGray)
        .lineWidth(1)
        .stroke();

      // Customer details in two columns with proper spacing
      const customerStartY = y + 55;
      const leftColX = 60;
      const rightColX = 320;  // Increased from 300 to create more space
      const labelWidth = 70;  // Reduced from 90 to move values more to the left
      const valueWidth = 180; // Add maximum width for values

      // Styling
      const labelStyle = () => doc.fontSize(10).fillColor(colors.gray);
      const valueStyle = () => doc.fontSize(12).fillColor(colors.dark);

      // Left Column - Customer info
      labelStyle().text('Name:', leftColX, customerStartY);
      valueStyle().text(bookingData.customerInfo.name, leftColX + labelWidth, customerStartY, { width: valueWidth });
      
      labelStyle().text('Email:', leftColX, customerStartY + 25);
      valueStyle().text(bookingData.customerInfo.email, leftColX + labelWidth, customerStartY + 25, { width: valueWidth });
      
      labelStyle().text('Phone:', leftColX, customerStartY + 50);
      valueStyle().text(bookingData.customerInfo.phone, leftColX + labelWidth, customerStartY + 50, { width: valueWidth });

      // Right Column - Booking details
      const formattedDate = formatDate(bookingData.date);
      
      labelStyle().text('Location:', rightColX, customerStartY);
      valueStyle().text(bookingData.customerInfo.pickupLocation, rightColX + labelWidth, customerStartY, { width: 160 });
      
      labelStyle().text('Date:', rightColX, customerStartY + 25);
      valueStyle().text(formattedDate, rightColX + labelWidth, customerStartY + 25, { width: 160 });
      
      labelStyle().text('Guests:', rightColX, customerStartY + 50);
      valueStyle().text(
        `${bookingData.guests.adults} ${bookingData.guests.adults === 1 ? 'Adult' : 'Adults'}${
          bookingData.guests.children ? `, ${bookingData.guests.children} ${bookingData.guests.children === 1 ? 'Child' : 'Children'}` : ''
        }`, 
        rightColX + labelWidth, 
        customerStartY + 50, 
        { width: 160 }
      );
    };

    // Fix airport transfer section to prevent strange symbols
    const addAirportTransfer = (y: number) => {
      if (!(bookingData.airportTransfer?.city && 
            bookingData.airportTransfer.date && 
            bookingData.airportTransfer.time && 
            typeof bookingData.airportTransfer.totalPrice === 'number')) {
        return y; // Return unchanged y position if no airport transfer
      }
      
      // Section header
      doc
        .fillColor(colors.dark)
        .fontSize(16)
        .text('Airport Transfer', 40, y)
        .moveDown(0.5);
        
      const boxY = y + 25;
      
      // Transfer box with gradient
      doc
        .save()
        .roundedRect(40, boxY, 515, 70, 8)
        .fillOpacity(0.7)
        .fill(colors.surface)
        .restore();
        
      // Left side decoration bar
      doc
        .roundedRect(40, boxY, 8, 70, 4)
        .fill(colors.secondary);
      
      // Format the airport date properly
      const formattedAirportDate = formatDate(bookingData.airportTransfer.date);
      
      // Airport name
      doc
        .fillColor(colors.dark)
        .fontSize(14)
        .text(`${bookingData.airportTransfer.city} Airport`, 65, boxY + 15);
        
      // Date and time with proper formatting (no strange symbols)
      doc
        .fontSize(11)
        .fillColor(colors.gray)
        .text(`Date: ${formattedAirportDate}`, 65, boxY + 35)
        .text(`Time: ${bookingData.airportTransfer.time}`, 65, boxY + 51);
      
      // Price - only show once on the right
      doc
        .fontSize(16)
        .fillColor(colors.secondary)
        .text(`€${bookingData.airportTransfer.totalPrice.toFixed(2)}`, 500, boxY + 30, { align: 'right' });
      
      return y + 110; // Return new y position
    };

    // Add activities section with improved price calculation
    const addActivities = (y: number) => {
      // Section title
      doc
        .fontSize(16)
        .fillColor(colors.dark)
        .text(bookingData.metadata?.isChezAli ? 'Chez Ali Experience' : 'Activities', 40, y)
        .moveDown(0.5);
      
      // Table header
      const tableTop = y + 25;
      doc
        .roundedRect(40, tableTop, 515, 30, 4)
        .fill(colors.primary);
      
      doc
        .fontSize(12)
        .fillColor(colors.white)
        .text('ACTIVITY', 60, tableTop + 10)
        .text('PRICE', 480, tableTop + 10, { align: 'right' });
      
      // Activities list with optimized spacing
      let currentY = tableTop + 30;
      
      // Helper for zebra striping
      const drawAlternatingRow = (y: number, i: number) => {
        if (i % 2 === 0) {
          doc
            .roundedRect(40, y, 515, 40, 0)
            .fill('#F8FAFC');
        }
      };
      
      // Track running total for calculation
      let runningTotal = 0;
      
      bookingData.activities.forEach((activity: any, i: number) => {
        drawAlternatingRow(currentY, i);
        
        let price = activity.totalPrice || 0;
        
        // For Chez Ali, calculate price based on menu selection and guest count
        if (bookingData.metadata?.isChezAli) {
          const menuPrice = bookingData.metadata.selectedMenu === 'tagine' ? 48 : 60;
          const totalGuests = bookingData.guests.adults + bookingData.guests.children;
          price = menuPrice * totalGuests;
        }
        
        // Add price to running total
        if (typeof price === 'number' && !isNaN(price)) {
          runningTotal += price;
        }
        
        // For Chez Ali, add menu type to the activity name
        const activityName = bookingData.metadata?.isChezAli 
          ? `${activity.name} (${bookingData.metadata.selectedMenu === 'tagine' ? 'Tagine Menu' : 'Mechoui Menu'})`
          : activity.name;
        
        // Activity name
        doc
          .fontSize(12)
          .fillColor(colors.dark)
          .text(activityName, 60, currentY + 12, { width: 380 });
        
        // If we have price details, add them
        if (activity.adultCount && activity.childCount) {
          doc
            .fontSize(9)
            .fillColor(colors.gray)
            .text(`${activity.adultCount} adults × €${activity.basePrice} + ${activity.childCount} children × €${activity.childPrice || 0}`, 
              60, currentY + 28, { width: 300 });
        } else if (activity.adultCount) {
          doc
            .fontSize(9)
            .fillColor(colors.gray)
            .text(`${activity.adultCount} adults × €${activity.basePrice}`, 
              60, currentY + 28, { width: 300 });
        }
        
        // Price with proper formatting
        doc
          .fontSize(12)
          .fillColor(colors.dark)
          .text(`€${typeof price === 'number' ? price.toFixed(2) : '0.00'}`, 480, currentY + 20, { align: 'right' });
        
        currentY += 40;
      });
      
      // Add airport transfer total if it exists
      if (bookingData.airportTransfer?.totalPrice && !isNaN(bookingData.airportTransfer.totalPrice)) {
        runningTotal += bookingData.airportTransfer.totalPrice;
      }
      
      // Add a spacer
      currentY += 10;
      
      // Total box - make it visually distinct
      doc
        .save()
        .roundedRect(345, currentY, 210, 50, 8)
        .fillOpacity(0.15)
        .fillAndStroke(colors.primary, 'transparent')
        .restore();
      
      doc
        .fontSize(14)
        .fillColor(colors.dark)
        .text('Total:', 370, currentY + 18)
        .fontSize(18)
        .fillColor(colors.primary)
        .text(`€${finalTotal.toFixed(2)}`, 480, currentY + 16, { align: 'right' });
      
      return currentY + 70; // Return new y position
    };

    // Add footer
    const addFooter = (y: number) => {
      const footerY = Math.max(y, 700); // Ensure footer is at the bottom
      
      // Add a nice decorative line
      doc
        .moveTo(40, footerY)
        .lineTo(555, footerY)
        .strokeColor(colors.lightGray)
        .lineWidth(1)
        .stroke();
      
      // Contact Information
      doc
        .fontSize(10)
        .fillColor(colors.gray)
        .text('VIP Marrakech Trips | www.vipmarrakechtrips.com | +212 750 032 850', 40, footerY + 15, { align: 'center' });
      
      // Add a small logo/brand
      doc
        .fontSize(9)
        .fillColor(colors.primary)
        .text('Thank you for choosing VIP Marrakech Trips!', 40, footerY + 30, { align: 'center' });
    };

    // Add page numbers
    const addPageNumbers = () => {
      const pageCount = doc.bufferedPageRange().count;
      for (let i = 0; i < pageCount; i++) {
        doc.switchToPage(i);
        doc
          .fontSize(8)
          .fillColor(colors.gray)
          .text(
            `Page ${i + 1} of ${pageCount}`,
            40,
            doc.page.height - 30,
            { align: 'center' }
          );
      }
    };

    // Build the PDF
    addHeader();
    
    // Start y position
    let yPosition = 180;
    
    // Add customer info
    addCustomerInfo(yPosition);
    yPosition += 150;
    
    // Add airport transfer if available
    yPosition = addAirportTransfer(yPosition);
    
    // Add activities section
    yPosition = addActivities(yPosition);
    
    // Add footer
    addFooter(yPosition);
    
    // Add page numbers
    addPageNumbers();
    
    // Finalize the PDF
    doc.end();

    // Wait for PDF to be generated
    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      const chunks: Buffer[] = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
    });

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="VIPMarrakechTrips-Booking-${bookingData.reference}.pdf"`
      }
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}