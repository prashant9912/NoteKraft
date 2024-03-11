import { Request, Response } from "express";
import User from "../models/user";
import { jwtUtil } from "../utils/jwt";

/**
 * Handles user register
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ error: "User already exists" });
    }

    const newUser = new User({ email, password });
    await newUser.save();
    res.status(200).json({ user: newUser.email, _id: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to create user, ${error}` });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json({
      user: { _id: user._id, email: user.email },
      token: jwtUtil.getToken({ _id: user._id }),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
};
