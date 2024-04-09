import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'hkp63546@gmail.com',
      pass: 'hkpthisishkp;'
    }
  });



  
const sendEmail = async (name, email, appointmentDate) => {

    try {
        return new Promise((resolve, reject) => {
            const mailOptions = {
                from: 'hkp63546@gmail.com',
                to: email,
                subject: 'Appointment Confirmation',
                html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Appointment Confirmation</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; font-size: 16px;">
                  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ccc; border-radius: 5px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                      <h1 style="color: #333;">Appointment Confirmation</h1>
                    </div>
                    <div style="padding: 20px; background-color: #ffffff; border: 1px solid #ccc; border-radius: 5px;">
                      <p>Dear ${name},</p>
                      <p>Your appointment has been confirmed for the following date:</p>
                      <p><strong>Appointment Date:</strong> ${appointmentDate}</p>
                      <p>We look forward to seeing you then!</p>
                    </div>
                    <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
                      <p>Best regards,<br>Your Company Name</p>
                    </div>
                  </div>
                </body>
                </html>
                
                `
              };


              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  reject(error);
                } else if (info) {
                  resolve(info);
                }
              });
              

        });
   
    

     

  

} catch (error) {
        
}

}

export default sendEmail

