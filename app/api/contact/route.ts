import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Create a full message including all fields
    const fullMessage = `
Name: ${body.name}
Email: ${body.email}
Company: ${body.company || "Not Provided"}
Domain: ${body.domain || "Not Provided"}
Message: ${body.message}
    `;

    const payload = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY, // MUST be public_key
      template_params: {
        message: fullMessage, // send everything in message field
      },
    };

    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const responseText = await res.text();
    console.log("EmailJS Response:", responseText);

    if (!res.ok) throw new Error(responseText);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ Email Send Error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
