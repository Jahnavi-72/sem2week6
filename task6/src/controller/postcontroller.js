const Post = require('../models/post.js'); // Import Post model
const User = require('../models/user.js'); // Import User model

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    // Validate the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the post
    const post = new Post({ title, content, user: userId });
    const savedPost = await post.save();

    // Add the post to the user's posts
    user.posts.push(savedPost._id);
    await user.save();

    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: 'Error creating post', error: err });
  }
};

module.exports = { createPost };