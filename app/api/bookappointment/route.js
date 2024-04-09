import Connection from "@/lib/Connection";
import Appointment from "@/lib/schema/AppointmentSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
  await Connection();
  const body = await request.json();
  const { name, email, date, subject, desc } = body;

  if (!name || !email ||  !date || !subject || !desc) {
    return new NextResponse(
      JSON.stringify({ error: "Please fillout all fields" }),
      { status: 400 }
    );
  }

  const bookAppointment = new Appointment({ name, email, date, subject, desc });

  const AppointmentBooked = await bookAppointment.save();

  if (!AppointmentBooked) {
    return new NextResponse(
      JSON.stringify({ error: "Error booking Appointment" }),
      { status: 503 }
    );
  }

  return NextResponse.json({ message: "Appointment Booked" }, { status: 201 });
}
