import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Public routes
router.use('/auth', authRoutes);

// TODO: Add authentication to the API routes
// Protect all routes under /api with the authenticateToken middleware
router.use('/api', authenticateToken, apiRoutes);

export default router;

