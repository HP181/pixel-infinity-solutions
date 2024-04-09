import Connection from "@/lib/Connection";
import Appointment from "@/lib/schema/AppointmentSchema";
import { NextResponse } from "next/server";

export async function GET() {
  await Connection();

  const getAllAppointments = await Appointment.find({}).select('-createdAt -updatedAt -__v')

 if(!getAllAppointments){
    return new NextResponse(
        JSON.stringify({ error: "Internal Server Error" }),
        { status: 500 }
      );
 }

  return NextResponse.json({ status: "fetched", message: getAllAppointments }, { status: 201 });
}

export const dynamic = "force-dynamic";