import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";

export const signUp = async (req, res) => {
  try {
    // Data came from frontend signUp form
    const { fullName, email, password, mobile, role } = req.body;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check mobile number
    if (mobile.length < 10) {
      return res.status(400).json({ message: "Please enter a valid mobile number" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword, // FIXED: hashedPassword (Capital P)
      mobile,
      role,
    });

    // Create token
    const token = await genToken(newUser._id); // FIXED: newUser (Capital U)

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    return res.status(201).json({ 
      user: newUser, // FIXED: return newUser instead of user
      message: "User created successfully" 
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credentials don't match" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credentials don't match" });
    }

    // Create token
    const token = await genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    return res.status(200).json({ user, message: "Signed in successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "SignIn failed" });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "SignOut failed" });
  }
};