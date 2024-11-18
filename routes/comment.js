const express = require('express');
const { getCommentsByArticleId, createComment } = require('../controllers/commentController');

const router = express.Router();

// Route to fetch comments for a specific article
router.get('/article/:articleId', getCommentsByArticleId);

// Route to create a new comment
router.post('/', createComment);

module.exports = router;
