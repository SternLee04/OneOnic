// server.js
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; // Import cookie-parser
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import mongoose from 'mongoose';
import { authMiddleware } from './middleware/authMiddleware.js';
import cors from 'cors';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

const app = express();

app.use(cors({ origin: '*', credentials: true }));

app.use(express.json());
app.use(cookieParser());

// Auth Routes
app.use('/api/auth', authRoutes);

app.use('/api/category', authMiddleware, categoryRoutes);

app.use('/api/product',authMiddleware, productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
