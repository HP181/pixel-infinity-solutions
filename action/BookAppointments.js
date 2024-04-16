"use server";

import Connection from "@/lib/Connection";
import Appointment from "@/lib/schema/AppointmentSchema";

async function BookAppointments(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const date = formData.get("date");
  const subject = formData.get("subject");
  const desc = formData.get("desc");

  await Connection();

  if (!name || !email || !date || !subject || !desc) {
    return {
      error: "Please fillout all fields",
      status: 403,
    };
  }
  const newDate = new Date(date);

  const bookAppointment = new Appointment({
    name,
    email,
    date: newDate,
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
