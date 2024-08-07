import express from "express";
import dotenv from "dotenv";
dotenv.config();

import path from "path";
import {
  signin,
  signup,
  resetPassword,
  requestPasswordReset,
  verifyOtp,
} from "./src/feature/user/user.controller.js";
import { authenticateToken } from "./src/middleware/auth.middleware.js";
import cors from "cors";

export const app = new express();

app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "public", "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public/"));
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/signup", signup);
app.post("/signin", signin);
app.post("/reset-password", authenticateToken, resetPassword);

app.post("/request-password-reset", requestPasswordReset);
app.post("/verify-otp", verifyOtp);
