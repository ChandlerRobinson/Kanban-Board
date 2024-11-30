console.log('authenticateToken middleware loaded');
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the structure of the payload for type safety
interface JwtPayload {
  username: string;
  id: number;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Verify the token exists and add the user data to the request object

  // Retrieve the token from the authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expecting "Bearer <token>"

  if (!token) {
    console.error('No token provided');
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    // Verify the token using the secret key from environment variables
    const secretKey = process.env.JWT_SECRET!;
    const payload = jwt.verify(token, secretKey) as JwtPayload;

    // TODO: Attach user information from the token to the request object
    (req as any).user = payload;

    console.log(`User authenticated: ${payload.username} (ID: ${payload.id})`);
    next(); // Continue to the next middleware or route handler
  } catch (err: any) {
    console.error('Invalid or expired token:', err.message);
    return res.status(403).json({ message: 'Invalid or Expired Token' });
  }
};




