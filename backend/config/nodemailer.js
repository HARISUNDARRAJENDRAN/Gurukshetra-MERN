import nodemailer from 'nodemailer';

const requiredMailEnv = ['SMTP_USER', 'SMTP_PASSWORD', 'SENDER_EMAIL'];
const missingMailEnv = requiredMailEnv.filter((key) => !process.env[key]);

if (missingMailEnv.length) {
    console.error(`Missing required mail environment variable(s): ${missingMailEnv.join(', ')}`);
}

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export default transporter;