import Connection from "@/lib/Connection";
import Contact from "@/lib/schema/Contact";
import { NextResponse } from "next/server";

export async function POST(request) {
  await Connection();
  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return new NextResponse(
      JSON.stringify({ error: "Please fillout all fields" }),
      { status: 400 }
    );
  }

  const user = new Contact({ name, email, message });

  const savedUser = await user.save();

  if (!savedUser) {
    return new NextResponse(
      JSON.stringify({ error: "Error creating contact" }),
      { status: 503 }
    );
  }

  return NextResponse.json({ message: "Submitted" }, { status: 201 });
}
