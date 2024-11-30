import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  console.log("Login request received");
  const { username, password } = req.body;

  try {
    console.log("Looking for user:", username);
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found, verifying password");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error("Invalid password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
    console.log("Password verified, generating token");
    const token = jwt.sign(
      { username: user.username, id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    console.log("Token generated successfully");
    return res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "An error occurred during login" });
  }
};


const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;




