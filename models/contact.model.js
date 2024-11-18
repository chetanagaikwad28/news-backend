const mongoose = require('mongoose');
// Define Schema and Model
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now },
  });
module.exports = mongoose.model('Contact', ContactSchema);  