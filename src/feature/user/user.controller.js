import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import {
  createUser,
  findUserByEmail,
  updateUserPassword,
  updateUserResetToken,
} from "./user.repository.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gnickyraj@gmail.com",
    pass: "ajfdlfpkemioqvoh",
  },
});
export const signup = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const existingUser = await findUserByEmail(email);
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser(email, hashedPassword);
  res.status(201).json({ message: "User created" });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user)
    return res.status(400).json({ message: "Invalid email or password" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({ message: "Invalid email or password" });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};

export const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { email } = req.user;

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(email, hashedPassword);
  res.json({ message: "Password reset successful" });
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(400).json({ message: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  const otpExpiry = Date.now() + 3600000; // OTP valid for 1 hour

  await updateUserResetToken(email, otp, otpExpiry);

  try {
    await transporter.sendMail({
      to: email,
      subject: "Password Reset OTP",
      html: `Your OTP for password reset is: <b>${otp}</b>. It is valid for 1 hour.`,
    });
  } catch (err) {
    console.log(err);
  }

  res.json({ message: "OTP sent to email" });
};

export const verifyOtp = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await findUserByEmail(email);
  if (!user || user.resetToken !== otp || user.resetTokenExpiry < Date.now())
    return res.status(400).json({ message: "Invalid or expired OTP" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(email, hashedPassword);

  // Optionally clear the OTP after use
  await updateUserResetToken(email, null, null);

  res.json({ message: "Password reset successful" });
};
