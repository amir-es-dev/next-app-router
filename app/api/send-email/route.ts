import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  await resend.emails.send({
    from: "...",
    to: "amir.islamnejad@gmail.com",
    subject: "...",
    react: null,
  });
  return NextResponse.json({});
}
