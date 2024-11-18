const Comment = require('../models/Comment');
const Article = require('../models/Article');

// Get all comments for a specific article
const getCommentsByArticleId = async (req, res) => {
  try {
    const { articleId } = req.params;
    const comments = await Comment.find({ article: articleId }).populate('author');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new comment for an article
const createComment = async (req, res) => {
  try {
    const { content, authorId, articleId } = req.body;

    // Create new comment
    const newComment = new Comment({
      content,
      author: authorId,
      article: articleId,
    });

    // Save comment and associate it with the article
    await newComment.save();
    await Article.findByIdAndUpdate(articleId, { $push: { comments: newComment._id } });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCommentsByArticleId,
  createComment,
};
