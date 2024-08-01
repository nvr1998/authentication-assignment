import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Token Verification Error:", err.message);
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
};
