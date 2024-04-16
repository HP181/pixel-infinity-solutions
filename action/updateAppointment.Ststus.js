"use server";

import sendEmail from "@/app/_components/sendEmail";
import Connection from "@/lib/Connection";
import Appointment from "@/lib/schema/AppointmentSchema";
import { revalidatePath } from "next/cache";

async function updateAppointmentStatus(_id, email, name, status, date) {
  try {
    await Connection();

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

    const Dates = getDate.toLocaleString("en-US", options);

    const updateObject = {
      status: status,
      isVerifiedByAdmin: true,
      date: date,
    };

    const updatedDoc = await Appointment.findByIdAndUpdate(_id, updateObject, {
      new: true,
    });

    if (!updatedDoc) {
      return {
        message: "Internal Server Error",
        statusCode: 500,
      };
    }

    const sendEmailSuccess = await sendEmail(name, email, status, Dates);

    if (!sendEmailSuccess) {
      return {
        message: "Error in sending email",
        statusCode: 500,
      };
    }

    return {
      message: "success",
      statusCode: 201,
    };
  } catch (error) {
    return {
      error: error,
      statusCode: 500,
    };
  }
}

revalidatePath("/admin/dashboard");

export default updateAppointmentStatus;
