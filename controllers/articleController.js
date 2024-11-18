// controllers/articleController.js
const mongoose = require('mongoose'); // For creating ObjectId
const Article = require('../models/Article');

// Get all articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error });
  }
};

// Get a single article
exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article', error });
  }
};

// Create a new article
exports.createArticle = async (req, res) => {
  try {
    // Create a new dummy author ID
    const authorId = new mongoose.Types.ObjectId();

    // Create a new article, adding the generated author ID
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
      author: authorId, // Assign the created author ID
      comments: req.body.comments || [], // Optional: Include comments if provided
    });

    // Save the new article to the database
    const article = await newArticle.save();

    // Return the created article with the generated author ID
    res.status(201).json({ article, generatedAuthorId: authorId });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ message: 'Error creating article', error: error.message });
  }
};

// delete a article 
exports.deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    return res.status(200).json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};