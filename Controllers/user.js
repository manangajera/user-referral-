import User from "../Models/User.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const { username, email, password, referral } = req.body;

  // Validate required fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  // Check if the email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Generate a unique referral code
  const referralCode = uuidv4().replace(/-/g, "").slice(0, 6).toUpperCase();

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user first
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    userReferralCode: referralCode,
    referredBy: null, // Default null, will update if referral is valid
  });

  try {
    // Save the new user to the database
    await newUser.save();

    if (referral) {
      // Check if the referral code exists
      const referredByUser = await User.findOne({ userReferralCode: referral });
      if (!referredByUser) {
        return res.status(400).json({ message: "Invalid referral code" });
      }

      // Update referredBy and add the new user to referrer's referredTo list
      newUser.referredBy = referredByUser._id;
      referredByUser.referredTo.push(newUser._id);

      // Save both updates
      await newUser.save();
      await referredByUser.save();
    }

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userLogin = async (req, res) => { 
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
    } 
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }        
        const token = jwt.sign(
            {id: existingUser._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );
        res.status(200).json(token);
    }
    catch{
        res.status(500).json({ message: error.message });
    }
}

export const getUsers = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("Authenticated User ID:", userId);

    const checkUser = await User.findById(userId);
    if (!checkUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserReferral = async (req, res) => {
  try {
    const userId = req.userId; // Use req.userId directly
    console.log("Authenticated User ID:", userId);

    const checkUser = await User.findById(userId);
    if (!checkUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const { id } = req.params;
    console.log("Requested User ID:", id);

    const user = await User.findById(id).populate("referredTo");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ referralDetails: user.referredTo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

