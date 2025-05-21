import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Use a dummy API key for local development if the environment variable is not set
const DUMMY_API_KEY = 're_dummy_RqnCsBSx_9gzxhfGztDATxAqtAPHTrTx8'; // This is just for passing build
const resend = new Resend(process.env.RESEND_API_KEY || DUMMY_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const booking = await request.json();
    
    if (!booking.customerInfo?.email || !booking.reference) {
      throw new Error('Missing required booking information');
    }

    // Format date properly - using the same format as booking-summary
    const formatDate = (date: any) => {
      if (!date) return 'TBD';
      try {
        const dateObj = date instanceof Date ? date : new Date(date);
        return dateObj.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch (error) {
        console.error('Error formatting date:', error);
        return 'TBD';
      }
    };

    // Format guests text
    const formatGuests = (guests: any) => {
      const totalGuests = guests.adults + guests.children;
      return `${totalGuests} ${totalGuests === 1 ? 'person' : 'people'} (${guests.adults} adult${guests.adults !== 1 ? 's' : ''}${guests.children ? ` & ${guests.children} child${guests.children !== 1 ? 'ren' : ''}` : ''})`;
    };

    // Format activities text with menu for Chez Ali and tour type for regular activities
    const formatActivities = (booking: any) => {
      return booking.activities.map((activity: any) => {
        let text = activity.name;
        
        // Add menu info for Chez Ali
        if (booking.metadata?.isChezAli && activity.selectedMenu) {
          text += ` (${activity.selectedMenu.charAt(0).toUpperCase() + activity.selectedMenu.slice(1)} Menu)`;
        } else {
          // Add tour type for regular activities
          text += ` (${booking.tourType.charAt(0).toUpperCase() + booking.tourType.slice(1)} Tour)`;
        }

        // Add price info
        text += ` - €${activity.totalPrice}`;
        
        return text;
      }).join('\n');
    };

    // Format airport pickup info
    const formatAirportPickup = (airportTransfer: any) => {
      if (!airportTransfer) return '';
      
      return `
        <div style="color: #334155;">
          <strong style="color: #0f172a; display: block; margin-bottom: 4px;">Airport Pickup</strong>
          ${airportTransfer.city} Airport<br/>
          Date: ${formatDate(airportTransfer.date)}<br/>
          Time: ${airportTransfer.time}<br/>
          Price: €${airportTransfer.totalPrice}
        </div>
      `;
    };

    const emailTemplate = `
      <div style="background-color: #f8fafc; padding: 40px 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; padding: 40px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
          <h1 style="color: #0f172a; font-size: 24px; margin-bottom: 24px;">
            Booking Confirmation
          </h1>
          
          <p style="color: #334155; margin-bottom: 24px;">
            Thank you for booking with VIP Marrakech Trips. Your booking reference is: <strong>${booking.reference}</strong>
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
            <div style="color: #334155;">
              <strong style="color: #0f172a; display: block; margin-bottom: 4px;">Name</strong>
              ${booking.customerInfo.name}
            </div>
            <div style="color: #334155;">
              <strong style="color: #0f172a; display: block; margin-bottom: 4px;">Email</strong>
              ${booking.customerInfo.email}
            </div>
            <div style="color: #334155;">
              <strong style="color: #0f172a; display: block; margin-bottom: 4px;">Phone</strong>
              ${booking.customerInfo.phone}
            </div>
            <div style="color: #334155;">
              <strong style="color: #0f172a; display: block; margin-bottom: 4px;">Pickup Location</strong>
              ${booking.customerInfo.pickupLocation}
            </div>
            <div style="color: #334155;">
              <strong style="color: #0f172a; display: block; margin-bottom: 4px;">Date</strong>
              ${formatDate(booking.date)}
            </div>
            <div style="color: #334155;">
              <strong style="color: #0f172a; display: block; margin-bottom: 4px;">Guests</strong>
              ${formatGuests(booking.guests)}
            </div>
            <div style="color: #334155;">
              <strong style="color: #0f172a; display: block; margin-bottom: 4px;">Payment Method</strong>
              ${booking.paymentDetails.method.charAt(0).toUpperCase() + booking.paymentDetails.method.slice(1)}
            </div>
            <div style="color: #334155;">
              <strong style="color: #0f172a; display: block; margin-bottom: 4px;">Total Amount</strong>
              €${booking.paymentDetails.totalAmount}
            </div>
            <div style="color: #334155; grid-column: span 2;">
              <strong style="color: #0f172a; display: block; margin-bottom: 4px;">Activities</strong>
              <pre style="margin: 0; font-family: inherit;">${formatActivities(booking)}</pre>
            </div>
            ${booking.airportTransfer ? formatAirportPickup(booking.airportTransfer) : ''}
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://vipmarrakehtrips.com/confirmation?ref=${booking.reference.replace('#', '')}" 
               style="display: inline-block; padding: 12px 24px; background: linear-gradient(to right, #FB923C, #F43F5E); 
                      color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">
              View Booking Details
            </a>
          </div>

          <p style="color: #334155; margin-bottom: 20px;">
            ${booking.paymentDetails.method === 'cash' 
              ? 'Please ensure to have the full amount ready on pickup.' 
              : 'Our travel expert will contact you shortly via WhatsApp to process the payment.'}
          </p>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 20px;">
            <p style="color: #334155; margin: 0;">Best regards,<br>VIP Marrakech Trips Team</p>
          </div>
        </div>
      </div>
    `;

    // Send both emails
    console.log('Owner email from env:', process.env.NEXT_PUBLIC_OWNER_EMAIL); // Debug log

    if (!process.env.NEXT_PUBLIC_OWNER_EMAIL) {
      console.error('Owner email is not set in environment variables!');
      throw new Error('Owner email is not configured');
    }

    // First send customer email
    await resend.emails.send({
      from: 'VIP Marrakech Trips <booking@vipmarrakechtrips.com>',
      replyTo: 'booking@vipmarrakechtrips.com',
      to: booking.customerInfo.email,
      subject: `Booking Confirmation - VIP Marrakech Trips`,
      html: emailTemplate,
    });

    // Wait for 500ms
    await new Promise(resolve => setTimeout(resolve, 500));

    // Then send owner email
    await resend.emails.send({
      from: 'VIP Marrakech Trips <booking@vipmarrakechtrips.com>',
      to: process.env.NEXT_PUBLIC_OWNER_EMAIL!,
      subject: `New Booking ${booking.reference}`,
      html: emailTemplate,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send email' },
      { status: 500 }
    );
  }
}