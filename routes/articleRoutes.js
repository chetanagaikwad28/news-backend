// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticle,
  createArticle
} = require('../controllers/articleController');

// Routes for articles
router.get('/articles', getArticles);
router.get('/articles/:id', getArticle);
router.post('/articles', createArticle);

module.exports = router;
