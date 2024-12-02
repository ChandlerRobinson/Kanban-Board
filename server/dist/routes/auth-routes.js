"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_1 = require("express");
const user_js_1 = require("../models/user.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Login request received");
    const { username, password } = req.body;
    try {
        console.log("Looking for user:", username);
        const user = yield user_js_1.User.findOne({ where: { username } });
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ message: "User not found" });
        }
        console.log("User found, verifying password");
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            console.error("Invalid password");
            return res.status(401).json({ message: "Invalid credentials" });
        }
        console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
        console.log("Password verified, generating token");
        const token = jsonwebtoken_1.default.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        console.log("Token generated successfully");
        return res.status(200).json({ token, message: "Login successful" });
    }
    catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "An error occurred during login" });
    }
});
exports.login = login;
const router = (0, express_1.Router)();
// POST /login - Login a user
router.post('/login', exports.login);
exports.default = router;
