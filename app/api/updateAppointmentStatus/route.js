import Connection from "@/lib/Connection";
import Appointment from "@/lib/schema/AppointmentSchema";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    await Connection();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.sendEmailUser,
        pass: process.env.sendEmailPass,
      },
    });

    const body = await request.json();
    const { _id, name, email, status, date } = body;

    const getDate = new Date(date);

    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };

    const updateObject = {
      status: status,
      isVerifiedByAdmin: true,
      date: date,
    };

    const updatedDoc = await Appointment.findByIdAndUpdate(_id, updateObject, {
      new: true,
    });

    if (!updatedDoc) {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }

    let subject;
    status === "confirm"
      ? (subject = "Appointment Confirmation")
      : (subject = "Appointment Rejection");

    const mailOptions = {
      from: '"Pixel Infinity Solutions" <hit98987@gmail.com>',
      to: email,
      subject: subject,
      text : "Pixel Infinity Solutions",
      html: `
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #ecf0f1; color: #000000 !important;">

  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">

    <h1 style="color: #000000; text-align: center; font-family: 'Playfair Display', serif; font-size: 26px; margin-top: 0;">
      Pixel Infinity Solutions
    </h1>

    <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; margin-top: 20px;">
      <p style="line-height: 1.6;">
        <strong>Dear ${name},</strong>
      </p>
     
      ${
        status === "confirm"
          ? ` 
      <p style="line-height: 1.6; color : green !important; font-weight : bold">Your appointment has been confirmed for the following date:</p> 
      
      <p style="line-height: 1.6; color : black !important;"><strong>Appointment Date:</strong> ${getDate.toLocaleString(
        "en-US",
        options
      )}</p>
      `
          : ` <p style="line-height: 1.6; color : red !important; font-weight : bold">Your appointment has been rejected for the following date:</p> 
      
      <p style="line-height: 1.6; color : red !important;"><strong>Appointment Date:</strong> ${getDate.toLocaleString(
        "en-US",
        options
      )}</p>
      
      `
      }
     
      <p style="line-height: 1.6; color : black !important;">We look forward to seeing you then!</p>
    </div>

    <div style="text-align: center; margin-top: 20px; font-size: 14px; color: #000000;">
      <p style="line-height: 1.6;">If you have any questions, please email us at <a href="mailto:hit98987@gmail.com">hit98987@gmail.com</a></p>
      <p style="line-height: 1.6;">You can also <a href="#" style="color: #000000;">unsubscribe</a> from these emails here.</p>
      <p style="line-height: 1.6;">59 Hayden St Unit 400, Toronto, ON M4Y 2P2. All rights reserved.</p>
    </div>

  </div>

</body>
            `,
    };

    const sendEmail = await transporter.sendMail(mailOptions);

    if (!sendEmail) {
      return NextResponse.json(
        { message: "Error in sending email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
