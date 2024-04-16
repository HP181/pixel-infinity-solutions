"use server";

import Connection from "@/lib/Connection";
import Contact from "@/lib/schema/Contact";

async function sendContactData(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  await Connection();

  if (!name || !email || !message) {
    return {
      error: "Please fillout all fields",
      status: 403,
    };
  }

  const user = new Contact({ name, email, message });

  const savedUser = await user.save();

  if (!savedUser) {
    return {
      error: "Error creating contact",
      status: 503,
    };
  }

  return {
    message: "Submitted",
    status: 201,
  };
}

export default sendContactData;
