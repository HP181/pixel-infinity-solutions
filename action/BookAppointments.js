"use server";

import Connection from "@/lib/Connection";
import Appointment from "@/lib/schema/AppointmentSchema";
import { format, parse } from "date-fns";

async function BookAppointments(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const date = formData.get("date");
  const subject = formData.get("subject");
  const desc = formData.get("desc");

  const parsedDate = parse(date, "dd/MM/yyyy", new Date());
  const outputDate = format(parsedDate, "yyyy-MM-dd") + "T05:14:13.000+00:00";

  await Connection();

  if (!name || !email || !date || !subject || !desc) {
    return {
      error: "Please fillout all fields",
      status: 403,
    };
  }

  const bookAppointment = new Appointment({
    name,
    email,
    date: outputDate,
    subject,
    desc,
  });

  const AppointmentBooked = await bookAppointment.save();

  if (!AppointmentBooked) {
    return {
      error: "Appointment Not Booked",
      status: "500",
    };
  }

  return {
    message: "Appointment Booked",
    status: 201,
  };
}
export default BookAppointments;
