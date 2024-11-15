const express = require('express');
const Article = require('../models/Article');
const Comment = require('../models/Comment');
const router = express.Router();

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().populate('author').populate('comments');
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author').populate('comments');
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new article
router.post('/', async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    const newArticle = new Article({
      title,
      content,
      author: authorId,
    });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an article
router.put('/:id', async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedArticle) return res.status(404).json({ message: 'Article not found' });
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error("Error deleting article:", error);  // Log the error on the server
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
