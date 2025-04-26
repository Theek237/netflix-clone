import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ sucess: false, message: "All Fields Are Required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ sucess: false, message: "Invalid Email" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        sucess: false,
        message: "Password must be at least 6 characters",
      });
    }

    const exsistingUserByEmail = await User.findOne({ email: email });
    if (exsistingUserByEmail) {
      return res
        .status(400)
        .json({ sucess: false, message: "Email Already Exists" });
    }

    const exsistingUserByUsername = await User.findOne({ username: username });
    if (exsistingUserByUsername) {
      return res
        .status(400)
        .json({ sucess: false, message: "Username Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // need to implement function to generate random image
    const newUser = new User({
      email: email,
      password: hashedPassword,
      username: username,
      // image:image,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    return res.status(201).json({
      sucess: true,
      message: "User Created Successfully",
      user: { ...newUser._doc, password: "" },
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Required" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({
      sucess: true,
      message: "Login Successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("notfilxToken");
    return res
      .status(200)
      .json({ success: true, message: "Logout Successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function authCheck(req, res) {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error in authCheck Controller");
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
