import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payload = {
      service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      public_key: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      template_params: {
        name: body.name,
        email: body.email,
        message: `
Company: ${body.company || "Not Provided"}
Industry: ${body.domain || "Not Provided"}
Message: ${body.message}
        `,
      },
    };

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    console.log("EmailJS Response =>", text);

    if (!response.ok) throw new Error(text);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ Email Send Error:", err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
