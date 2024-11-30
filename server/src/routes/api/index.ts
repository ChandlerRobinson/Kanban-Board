import { Router } from 'express';
import authRoutes from '../auth-routes'; // Correct path for 'auth-routes.ts'
import { authenticateToken } from '../../middleware/auth'; // Correct path for middleware

const router = Router();

// Use authentication middleware for protected API routes
router.use('/auth', authRoutes); // Authentication routes
router.use(authenticateToken); // Apply authentication to all API routes

export default router;

