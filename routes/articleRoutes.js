const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticle,
  createArticle,
  deleteArticle // Make sure this is imported
} = require('../controllers/articleController');

// Routes for articles
router.get('/articles', getArticles);
router.get('/articles/:id', getArticle);
router.post('/articles', createArticle);
router.delete('/articles/:id', deleteArticle); // Use deleteArticle here

module.exports = router;