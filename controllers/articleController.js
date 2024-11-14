// controllers/articleController.js
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
    const newArticle = new Article(req.body);
    const article = await newArticle.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error creating article', error });
  }
};
