import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: String, // OTP field
  resetTokenExpiry: Date, // OTP expiry
});

const User = mongoose.model("User", userSchema);

export default User;
