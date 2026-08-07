// import User from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import genToken from "../utils/token.js";
// import { sendOtpMail } from "../utils/mail.js";

// export const signUp = async (req, res) => {
//   try {
//     // Data came from frontend signUp form
//     const { fullName, email, password, mobile, role } = req.body;

//     // Check if user already exists
//     const user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Check password length
//     if (password.length < 6) {
//       return res.status(400).json({ message: "Password must be at least 6 characters" });
//     }

//     // Check mobile number
//     if (mobile.length < 10) {
//       return res.status(400).json({ message: "Please enter a valid mobile number" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = await User.create({
//       fullName,
//       email,
//       password: hashedPassword, // FIXED: hashedPassword (Capital P)
//       mobile,
//       role,
//     });

//     // Create token
//     const token = await genToken(newUser._id); // FIXED: newUser (Capital U)

//     res.cookie("token", token, {
//       secure: false,
//       sameSite: "strict",
//       maxAge: 1000 * 60 * 60 * 24 * 7,
//       httpOnly: true,
//     });

//     return res.status(201).json({ 
//       user: newUser, // FIXED: return newUser instead of user
//       message: "User created successfully" 
//     });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };

// export const signIn = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Credentials don't match" });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Credentials don't match" });
//     }

//     // Create token
//     const token = await genToken(user._id);

//     res.cookie("token", token, {
//       secure: false,
//       sameSite: "strict",
//       maxAge: 1000 * 60 * 60 * 24 * 7,
//       httpOnly: true,
//     });

//     return res.status(200).json({ user, message: "Signed in successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "SignIn failed" });
//   }
// };

// export const signOut = async (req, res) => {
//   try {
//     res.clearCookie("token");
//     return res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "SignOut failed" });
//   }
// };


// //  send generated otp
// export const sendOtp = async (req, res) => {
//   try {
//     const { email } = req.body; // fron frontend

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }
//     // generate random otp in string form
//     const otp = Math.floor(1000 + Math.random() * 9000).toString();
//     user.resetOtp = otp;
//     user.otpExpires = Date.now() + 5*60*1000; // 5 minutes
//     user.isOtpVerified = false;
//     await user.save();

//     // send otp to user
//     await sendOtpMail(email, otp);// email comes from body of frontend
//     return res.status(200).json({ message: "Otp sent successfully" });
//   } catch (error) {
//     res.status(500).json(`sendOtp failed ${error}`);
//   }
// };

// // confirm sended otp to varify
// export const varifyOtp = async (req, res) => {
//   try {
//     // otp from frontend
//     const { email, otp } = req.body;
//     const user = await User.findOne({ email });
//     // invalid email
//     if (!user) {
//       return res.status(400).json({ message: "Something went wrong" });
//     }

//     // invalid otp { otp by user != otp from db }
//     if (user.resetOtp != otp) {
//       return res.status(400).json({ message: "Something went wrong" });
//     }

//     // otp expired
//     if (user.otpExpires < Date.now()) {
//       return res.status(400).json({ message: "OTP expired/Invalid" });
//     }

//     // valid otp
//     user.isOtpVerified = true;
//     user.resetOtp = undefined;
//     user.otpExpires = undefined;
//     await user.save();
//     return res.status(200).json({ message: "OTP verified successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// }

// // reset password
// export const resetPassword = async (req, res) => {
//   try {
//     // from frontend body
//     const { email, newPassword } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !user.isOtpVerified) {
//       return res.status(400).json({ message: "Something went wrong" });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     user.isOtpVerified = false;
//     await user.save();
//     return res.status(200).json({ message: "Password reset successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// }

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";

// 1. Sign Up
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if (mobile.length < 10) {
      return res.status(400).json({ message: "Please enter a valid mobile number" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      mobile,
      role: role.toLowerCase(),
    });

    const token = await genToken(newUser._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    return res.status(201).json({
      user: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// 2. Sign In
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credentials don't match" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credentials don't match" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    return res.status(200).json({ user, message: "Signed in successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "SignIn failed" });
  }
};

// 3. Sign Out
export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "SignOut failed" });
  }
};

// 4. Send OTP
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
    user.isOtpVerified = false;
    await user.save();

    await sendOtpMail(email, otp);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("sendOtp error:", error);
    return res.status(500).json({ message: "Failed to send OTP email" });
  }
};

// 5. Verify OTP
// export const verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     if (user.resetOtp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     if (user.otpExpires < Date.now()) {
//       return res.status(400).json({ message: "OTP has expired" });
//     }

//     user.isOtpVerified = true;
//     user.resetOtp = undefined;
//     user.otpExpires = undefined;
//     await user.save();

//     return res.status(200).json({ message: "OTP verified successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "OTP verification failed" });
//   }
// };
// Verify OTP Controller Fix
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Convert both to String and trim whitespace to prevent strict equality failures
    if (!user.resetOtp || String(user.resetOtp).trim() !== String(otp).trim()) {
      return res.status(400).json({ message: "Invalid OTP. Please check your email." });
    }

    // Check if expired
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    // Mark as verified
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("verifyOtp error:", error);
    return res.status(500).json({ message: "OTP verification failed" });
  }
};

// 6. Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "Unauthorized or invalid session" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Reset password failed" });
  }
};