import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  updateUserPassword,
} from "./user.repository.js";

export const signup = async (req, res) => {
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
