import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error('MONGODB_URL is not set in environment variables');
        }

        mongoose.connection.on('connected', () => console.log("Database connected"));
        mongoose.connection.on('error', (error) => console.error('MongoDB connection error:', error.message));

        await mongoose.connect(`${process.env.MONGODB_URL}/gurukshetra`);
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        process.exit(1);
    }

};

export default connectDB;
