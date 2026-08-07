import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "Gmail", // same for all providers
  port: 465,// always 465 same for all providers
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

export const sendOtpMail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to,
      subject: "Reset Your Password",
      html: `<p>Your OTP for verification is: <strong> <b>${otp}<b/> </strong></p>`,
    });
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};