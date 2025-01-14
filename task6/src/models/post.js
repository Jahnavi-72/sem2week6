//Task14
const mongoose = require('mongoose');

// Define the Post schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post; // Export the model
//Task15
const mongoose = require('mongoose');

// Define the Post schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post; // Export the model
//Task16
const mongoose = require('mongoose');

// Define the Post schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;

