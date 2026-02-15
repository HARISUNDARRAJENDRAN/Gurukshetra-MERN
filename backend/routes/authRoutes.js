import express from 'express';
import {
	register,
	login,
	logout,
	isAuthenticated,
	getUserData,
	sendVerifyOtp,
	verifyEmail,
	sendResetOtp,
	resetPassword,
} from '../controller/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/is-auth', userAuth, isAuthenticated);
authRouter.get('/me', userAuth, getUserData);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-email', userAuth, verifyEmail);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);

export default authRouter;