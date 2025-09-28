import mongoose from "mongoose";
import { User } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const registerUser = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    // Log the request body to check if all fields are being received
    console.log(req.body);

    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      fullName,
      email,
      phoneNumber,
      role,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({ success: true, message: "User registered successfully", role: user.role });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exist" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Password is incorrect" });
      }
      const tokenData = {
        userId: user._id
      };
      const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

      return res
        .status(200)
        .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" })
        .json({ success: true, message: `Welcome back ${user.fullName}`, user , role:user.role, token });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
}

const logoutUser = async (req,res) =>{
  try {
  return res.status(200).cookie("token", "", {maxAge: 0}).json({
    Success: true, message: "Logged out successfully"
  });
  } catch (error) {
    console.log(error);
    return res.json({success: false , message: "Something went Wrong"});
  }
}

const userProfile = async (req,res) =>{
  try {
    const userId = req.id;
    const user = await User.findById({ _id: userId});
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.json({success: false , message: "Something went Wrong"}); 
  }
}



const updateProfile = async (req, res) => {
  try {
    const {fullName, email, phoneNumber, role, company, bio, skills } = req.body;

    const skillsArray = skills ? skills.split(",") : undefined;
    
    const userId = req.id;
    // Correcting the User query
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields only if they are provided in the request
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (role) user.role = role;
    if (company) user.profile.company = company;
    if (bio) user.profile.bio = bio;
    if (skillsArray) user.profile.skills = skillsArray;

    await user.save();

    // Send a response with the updated user information
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Something went wrong" });
  }
};


export  {
 registerUser,
 loginUser,
 logoutUser,
 updateProfile,
 userProfile,
}