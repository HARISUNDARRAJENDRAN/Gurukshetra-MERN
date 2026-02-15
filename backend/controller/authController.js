import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

const createToken = (userId) => jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

const sendMailSafely = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Mail send failed:', error.message);
    }
};

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing details' });
    }

    if (password.length < 6) {
        return res.json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();

        const token = createToken(newUser._id);
        res.cookie('token', token, cookieOptions);

        await sendMailSafely({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to Gurukshetra',
            text: `Hi ${name},\n\nThank you for registering at Gurukshetra.`,
        });

        return res.json({
            success: true,
            message: 'Registration successful',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isAccountVerified: newUser.isAccountVerified,
            },
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Missing details' });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const token = createToken(user._id);
        res.cookie('token', token, cookieOptions);

        return res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified,
            },
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: 'Logged out' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const isAuthenticated = async (req, res) => {
    return res.json({ success: true, message: 'Authenticated' });
};

export const getUserData = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select('-password');

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        return res.json({ success: true, user });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const sendVerifyOtp = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.isAccountVerified) {
            return res.json({ success: false, message: 'User already verified' });
        }

        const otp = generateOtp();
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000;
        await user.save();

        await sendMailSafely({
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Verify Your Account',
            text: `Your account verification OTP is: ${otp}`,
        });

        return res.json({ success: true, message: 'Verification OTP sent to email' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    const { otp } = req.body;

    if (!otp) {
        return res.json({ success: false, message: 'Missing OTP' });
    }

    try {
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (
            !user.verifyOtp ||
            user.verifyOtp !== otp ||
            !user.verifyOtpExpireAt ||
            user.verifyOtpExpireAt < Date.now()
        ) {
            return res.json({ success: false, message: 'Invalid or expired OTP' });
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();

        return res.json({ success: true, message: 'Email verified successfully' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: 'Email is required' });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const otp = generateOtp();
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000;
        await user.save();

        await sendMailSafely({
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your password reset OTP is: ${otp}`,
        });

        return res.json({ success: true, message: 'Password reset OTP sent to email' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: 'Missing details' });
    }

    if (newPassword.length < 6) {
        return res.json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (
            !user.resetOtp ||
            user.resetOtp !== otp ||
            !user.resetOtpExpireAt ||
            user.resetOtpExpireAt < Date.now()
        ) {
            return res.json({ success: false, message: 'Invalid or expired OTP' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        await user.save();

        return res.json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};