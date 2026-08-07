// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// // Create a transporter using SMTP
// const transporter = nodemailer.createTransport({
//   service: "Gmail", // same for all providers
//   port: 465,// always 465 same for all providers
//   secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
//   auth: {
//     user: process.env.NODEMAILER_EMAIL,
//     pass: process.env.NODEMAILER_PASS,
//   },
// });

// export const sendOtpMail = async (to, otp) => {
//   try {
//     const info = await transporter.sendMail({
//       from: process.env.NODEMAILER_EMAIL,
//       to,
//       subject: "Reset Your Password",
//       html: `<p>Your OTP for verification is: <strong> <b>${otp}<b/> </strong></p>`,
//     });
//     console.log("Email sent:", info.response);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

import nodemailer from "nodemailer";

export const sendOtpMail = async (to, otp) => {
  try {
    // Debug check to make sure env vars are being read
    if (!process.env.NODEMAILER_EMAIL || !process.env.NODEMAILER_PASS) {
      throw new Error(
        "Missing NODEMAILER_EMAIL or NODEMAILER_PASS in environment variables."
      );
    }

    // Initialize transporter dynamically inside the function
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to,
      subject: "Reset Your Password - FoodVingo",
      html: `<p>Your OTP for verification is: <strong>${otp}</strong></p>`,
    });

    console.log("Email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("Nodemailer error:", error);
    throw error;
  }
};