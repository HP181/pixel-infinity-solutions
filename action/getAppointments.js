"use server";

import Connection from "@/lib/Connection";
import Appointment from "@/lib/schema/AppointmentSchema";
import { revalidatePath } from "next/cache";

async function getAppointments() {
  await Connection();

  const getAllAppointments = await Appointment.find({})
    .select("_id name email date subject desc status isVerifiedByAdmin")
    .lean();

  if (!getAllAppointments) {
    return {
      error: "Internal Server Error",
      status: 500,
    };
  }

  const convertedData = getAllAppointments.map((item, index) => ({
    ...item,
    _id: item._id.toString(),
    id: index + 1,
  }));

  return {
    message: convertedData,
    status: "fetched",
    statuscode: "201",
  };
}

revalidatePath("/admin/dashboard");

export default getAppointments;
