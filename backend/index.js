import "dotenv/config";
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import ProductManagementRoutes from './src/routes/productManagementRoutes/ProductManagementRoutes.js';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


// Routes
app.use('/api/product-management', ProductManagementRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    });
