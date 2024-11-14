// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const articleRoutes = require('./routes/articleRoutes');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', articleRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
