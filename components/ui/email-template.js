import * as React from 'react';



const EmailTemplate = ({
  name, appointmentDate
}) => (
    <html>
    <head />
    <preview>New message from Pixel-Infinity-Solutions</preview>
      <body style={{ backgroundColor: '#f9f9f9', color: 'black' }}>
        <section style={{ margin: '0 auto', padding: '8px 16px', backgroundColor: '#f9f9f9', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '768px' }}>
          <section style={{ backgroundColor: '#ffffff', borderColor: 'black', marginTop: '10px', padding: '10px', borderRadius: '5px' }}>
            <h1 style={{ fontWeight: 'bold', fontSize: '24px', lineHeight: '1.4' }}>
              Booking Confirmation For Your Project.
            </h1>
            <hr style={{ borderBottom: '1px solid black', marginTop: '10px', marginBottom: '10px' }} />
            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Dear {name},</p>
            <p style={{ fontSize: '16px' }}>Your appointment has been confirmed for the following date:</p>
            <p style={{ fontSize: '16px' }}><strong>Appointment Date:</strong> {appointmentDate}</p>
            <p style={{ fontSize: '16px' }}>We look forward to seeing you then!</p>
            <p style={{ fontSize: '12px', marginTop: '8px' }}>Best regards,<br />Pixel Infinity Solutions</p>
          </section>
        </section>
      </body>
  </html>
  
);
 
export default EmailTemplate;