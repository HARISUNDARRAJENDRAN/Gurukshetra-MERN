import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.use(express.json()); //all requests will be sent in json format
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

app.listen(port, () => console.log(`Server started on Port: ${port}`))


 