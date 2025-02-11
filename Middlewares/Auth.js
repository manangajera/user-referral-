import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set
    req.userId = decoded.id; // Correctly set userId
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
