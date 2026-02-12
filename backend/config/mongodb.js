import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database connected"));

    await mongoose.connect(`${process.env.MONGODB_URL}/gurukshetra`);

};

export default connectDB;
