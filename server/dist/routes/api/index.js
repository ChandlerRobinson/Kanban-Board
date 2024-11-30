"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../auth-routes")); // Correct path for 'auth-routes.ts'
const auth_1 = require("../../middleware/auth"); // Correct path for middleware
const router = (0, express_1.Router)();
// Use authentication middleware for protected API routes
router.use('/auth', auth_routes_1.default); // Authentication routes
router.use(auth_1.authenticateToken); // Apply authentication to all API routes
exports.default = router;
