const express = require('express');
const Comment = require('../models/Comment');
const Article = require('../models/Article');
const router = express.Router();

// Get all comments for a specific article
router.get('/article/:articleId', async (req, res) => {
  try {
    const comments = await Comment.find({ article: req.params.articleId }).populate('author');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new comment for an article
router.post('/', async (req, res) => {
  try {
    const { content, authorId, articleId } = req.body;
    const newComment = new Comment({
      content,
      author: authorId,
      article: articleId,
    });
    await newComment.save();
    await Article.findByIdAndUpdate(articleId, { $push: { comments: newComment._id } });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
