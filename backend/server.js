import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import cloudinaryConnect from "./config/cloudinary.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import enrollmentRouter from "./routes/enrollmentRoute.js";

dotenv.config();

const requiredEnv = ['MONGODB_URL', 'JWT_SECRET'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length) {
	console.error(`Missing required environment variable(s): ${missingEnv.join(', ')}`);
	process.exit(1);
}

const app = express();
const port = process.env.PORT || 5000;
connectDB();
cloudinaryConnect();

app.use(express.json()); //all requests will be sent in json format
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
	cors({
		origin: process.env.CORS_ORIGIN || true,
		credentials: true,
	})
); // allows cookies in cross-site requests

//API ENDPOINTS
app.get('/', (req,res) => res.send("API working"))
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/course', courseRouter);
app.use('/api/enrollment', enrollmentRouter);

app.listen(port, () => console.log(`Server started on Port: ${port}`))


 