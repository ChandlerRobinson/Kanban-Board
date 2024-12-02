"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
console.log('authenticateToken middleware loaded');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
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
        const secretKey = process.env.JWT_SECRET_KEY;
        const payload = jsonwebtoken_1.default.verify(token, secretKey);
        // TODO: Attach user information from the token to the request object
        req.user = payload;
        console.log(`User authenticated: ${payload.username} (ID: ${payload.id})`);
        next(); // Continue to the next middleware or route handler
    }
    catch (err) {
        console.error('Invalid or expired token:', err.message);
        return res.status(403).json({ message: 'Invalid or Expired Token' });
    }
};
exports.authenticateToken = authenticateToken;
