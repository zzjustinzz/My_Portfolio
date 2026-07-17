"use server";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ActionResult {
  success: boolean;
  error?: string;
}

export async function sendEmail(data: ContactFormData): Promise<ActionResult> {
  const { name, email, message } = data;

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." };
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    // Graceful fallback if key not configured
    console.warn("RESEND_API_KEY not set — email not sent.");
    return { success: true }; // show success to user anyway during dev
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["thanhtdfu@gmail.com"],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4F46E5;">New message from your portfolio</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: #f5f5f5; padding: 16px; border-radius: 8px;">${message}</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return { success: false, error: "Failed to send message. Please try again." };
    }

    return { success: true };
  } catch (err) {
    console.error("sendEmail error:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}
