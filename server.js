// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const articleRoutes = require('./routes/articleRoutes');
app.use('/api', articleRoutes);
app.use('/api/articles/:id', articleRoutes);
app.use('/api/articles', articleRoutes);

const contactRoutes = require('./routes/contact.routes');
app.use('/api/contact', contactRoutes);

const commentRoutes = require('./routes/comment'); // Import comment routes
app.use('/api/comments', commentRoutes); // Comment routes

// const articles = require('./routes/articles');
// app.delete('/api/articles', articleController.deleteArticle);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
