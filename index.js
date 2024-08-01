import express from "express";
import dotenv from "dotenv";
dotenv.config();

import path from "path";
import {
  signin,
  signup,
  resetPassword,
} from "./src/feature/user/user.controller.js";
import { authenticateToken } from "./src/middleware/auth.middleware.js";

export const app = new express();

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "public", "views"));

app.use(express.json());
app.use(express.static("public/"));

app.post("/signup", signup);
app.post("/signin", signin);
app.post("/reset-password", authenticateToken, resetPassword);
