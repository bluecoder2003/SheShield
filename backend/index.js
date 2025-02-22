import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from "./src/app.js"
dotenv.config();

(async () => {
    try {
        const mongoUrl = process.env.MONGODB_URL;
        if (!mongoUrl) {
            throw new Error('MONGODB_URL is not defined in the environment variables');
        }
        await mongoose.connect(mongoUrl);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error.message)

    }
})();