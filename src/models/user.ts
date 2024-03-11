import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";
import { User } from "../types/user";
import { emailRegex } from "../utils/email-validation";

const userSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [emailRegex, "Please enter a valid email address"], // Validate email format
  },
  password: { type: String, required: true, select: false },
  createdAt: {
    type: Date,
    default: Date.now, // Set default value to current date/time
  },
});

/**
 * Hash the password before saving it to the database
 */
userSchema.pre<User>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch {
    next(new Error("Failed to save password"));
  }
});

/**
 * Method to compare user password
 */
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<User>("User", userSchema);
