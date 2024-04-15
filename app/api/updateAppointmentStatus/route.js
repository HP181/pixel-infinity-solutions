import Connection from "@/lib/Connection";
import Appointment from "@/lib/schema/AppointmentSchema";
import { NextResponse } from "next/server";
import sendEmail from "@/app/_components/sendEmail";


export async function POST(request) {
  try {
    await Connection();

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

    const Dates = getDate.toLocaleString( "en-US", options)

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

    const sendEmailSuccess = await sendEmail(name, email, status, Dates)

    if (!sendEmailSuccess) {
        return NextResponse.json(
          { message: "Error in sending email" },
          { status: 500 }
        );
      }

    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error : error }, { status: 500 });
  }
}
