//Task7
const express = require('express');
const User = require('../models/user.js');  // Import the User model

const router = express.Router();

// Controller function to fetch all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find();  // Fetch all users from the database
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json(users);  // Return users in the response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Define the route to get all users
router.get('/', getAllUsers);

module.exports = router;
//Task8
const express = require('express');
const User = require('../models/user.js');  

const router = express.Router();

async function updateUserById(req, res) {
  const { id } = req.params; 
  const { name, email, age } = req.body; 

  try {
  
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      { name, email, age }, 
      { new: true, runValidators: true }  
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
router.put('/:id', updateUserById);

module.exports = router;
//Task9
async function deleteUserById(req, res) {
    const userId = req.params.id;
  
    try {
      const result = await User.findByIdAndDelete(userId);
  
      if (!result) {
        return res.status(404).json({ message: `No user found with ID: ${userId}` });
      }
  
      res.status(200).json({ message: `User with ID ${userId} has been deleted.` });
    } catch (err) {
      res.status(500).json({ error: `Error deleting user: ${err.message}` });
    }
  }
  
  module.exports = { deleteUserById };
  //Task10
  // Controller to handle GET request for users
async function getUsers(req, res) {
    const { age } = req.query; // e.g., GET /users?age=18
  
    // Build the query criteria
    const criteria = {};
    if (age) {
      criteria.age = { $gt: parseInt(age, 10) }; // Users with age > specified value
    }
  
    try {
      const users = await userService.findUsersByCriteria(criteria);
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  module.exports = { getUsers };
  //Task11
  async function getUsersByNamePrefix(req, res) {
    const { prefix } = req.query;
    if (!prefix) {
      return res.status(400).json({ error: 'Prefix query parameter is required.' });
    }
  
    try {
      const users = await userService.findUsersByNamePrefix(prefix);
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  module.exports = { getUsersByNamePrefix };
  //Task12
  // Controller function to get users with selected fields
const getUsers = async (req, res) => {
    try {
      const users = await User.find()
        .select('name email');  
  
      res.status(200).json(users);  
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving users', error: err });
    }
  };
  
  module.exports = { getUsers }; 
  //Task14
  const Post = require('../models/post.js'); // Import Post model
const User = require('../models/user.js'); // Import User model for validation

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

    res.status(201).json(savedPost); // Respond with the created post
  } catch (err) {
    res.status(500).json({ message: 'Error creating post', error: err });
  }
};

// Get all posts with user information
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name email') // Populate user reference with name and email
      .exec();

    res.status(200).json(posts); // Respond with the posts
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving posts', error: err });
  }
};

module.exports = { createPost, getAllPosts }; // Export controller func
//Task15
const Post = require('../models/post.js'); // Import Post model

// Fetch posts with populated user details
const getPostsWithUserDetails = async (req, res) => {
  try {
    // Fetch posts and populate the 'user' field with specific details
    const posts = await Post.find()
      .populate('user', 'name email') // Populate the 'user' field with 'name' and 'email'
      .exec();

    res.status(200).json(posts); // Respond with the posts and user details
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err });
  }
};

module.exports = { getPostsWithUserDetails };
//Task16
const User = require('../models/user.js'); // Import User model
const Post = require('../models/post.js'); // Import Post model

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({ name, email, password });
    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};

// Get a user along with their posts
const getUserWithPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user and populate posts
    const user = await User.findById(userId)
      .populate('posts')
      .exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user with posts', error: err });
  }
};

module.exports = { createUser, getUserWithPosts };
//Task17
// controllers/userController.js
const User = require('../models/user.js');

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser };
//Task18
const User = require('../models/user.js'); // Import the Mongoose model

// Function to create a user
const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Create a new user instance
    const newUser = new User({ name, email, age });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user', details: err.message });
  }
};

// Function to get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
};

module.exports = { createUser, getUsers };
//Task19
// controllers/controller.js
const User = require('../models/user.js');

// Controller function to get all users and their fullName
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users.map(user => ({
      id: user._id,
      fullName: user.fullName // Using the virtual property
    })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to create a new user
const createUser = async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    const newUser = new User({ firstName, lastName });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getUsers, createUser };
//Task20
const User = require('../models/user.js');  // Import the User model

class UserController {
  // Create a new user
  static async createUser(req, res) {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get a user by ID
  static async getUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get all users
  static async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UserController;
//Task21
const User = require('../models/user.js');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { email, name } = req.body;
    const newUser = await User.create({ email, name });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Find user by email
exports.findUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Task22
const User = require('./user'); 
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
};
const createUser = async (req, res) => {
  try {
    const { email, name } = req.body;

    const newUser = await User.create({ email, name });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: 'An error occurred while creating the user.' });
  }
};
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ where: { email } });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error fetching user by email:', error);
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
};
const updateUser = async (req, res) => {
  try {
    const { email } = req.params;
    const { name } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) {
      user.name = name;
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ error: 'An error occurred while updating the user.' });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ where: { email } });

    if (user) {
      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully.' });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user.' });
  }
};
module.exports = {
  getAllUsers,
  createUser,
  getUserByEmail,
  updateUser,
  deleteUser,
};
//Task23
const User = require('../models/user.js');
const groupUsersByAge = async (req, res) => {
  try {
    const results = await User.aggregate([
      {
        $group: {
          _id: "$age", 
          userCount: { $sum: 1 }, 
        },
      },
      {
        $sort: { _id: 1 }, 
      },
    ]);

    res.status(200).json(results);
//Task24
const User = require('../models/user.js');

// Calculate the average age of users
const calculateAverageAge = async (req, res) => {
  try {
    const results = await User.aggregate([
      {
        $group: {
          _id: null, // Group all users together
          averageAge: { $avg: "$age" }, // Calculate the average of the `age` field
        },
      },
      {
        $project: {
          _id: 0, // Exclude the `_id` field from the results
          averageAge: 1, // Include only the `averageAge` field
        },
      },
    ]);

    res.status(200).json(results[0] || { averageAge: 0 });
  } catch (error) {
    console.error('Error in aggregation:', error);
    res.status(500).json({ error: 'An error occurred during aggregation.' });
  }
};

module.exports = { calculateAverageAge };
//Task25
const User = require('../models/user.js');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Create a new user
    const newUser = await User.create({ name, email, age });
    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message }); // Send validation error details
    } else {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
  }
};

module.exports = { createUser };
//Task26
const User = require('../models/user.js');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Attempt to create a new user
    const newUser = await User.create({ name, email, age });
    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle Mongoose validation errors
      const messages = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ errors: messages });
    } else {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
  }
};

module.exports = { createUser };
//Task27
const User = require('../models/user.js');

// Get account age of a specific user
const getUserAccountAge = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Use the schema method to calculate the account age
    const accountAge = user.getAccountAge();
    res.status(200).json({ userId: user._id, accountAgeInDays: accountAge });
  } catch (error) {
    console.error('Error retrieving user account age:', error);
    res.status(500).json({ error: 'An error occurred while retrieving account age.' });
  }
};

module.exports = { getUserAccountAge };
//Task28
onst User = require('../models/user.js');

// Find users by the first letter of their name
const findUsersByFirstLetter = async (req, res) => {
  try {
    const { letter } = req.params;

    // Use the static method to find users
    const users = await User.findByFirstLetter(letter);

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found with that first letter.' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error finding users by first letter:', error);
    res.status(500).json({ error: 'An error occurred while retrieving users.' });
  }
};

//Task29
const mongoose = require('mongoose');
const User = require('../models/user.js');

// Update user age and create an audit log in a transaction
const updateUserAndLogChange = async (req, res) => {
  const { userId, newAge } = req.body;

  const session = await mongoose.startSession(); // Start a session

  try {
    session.startTransaction(); // Begin the transaction

    // Update the user's age in the User collection
    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new Error('User not found');
    }

    user.age = newAge;
    await user.save();

    // Create an audit log in the AuditLog collection
    const log = new AuditLog({
      action: 'User Age Update',
      details: `Updated age for user ${userId} to ${newAge}`,
    });

    await log.save({ session }); // Save audit log in the same transaction

    // Commit the transaction if all operations are successful
    await session.commitTransaction();
    res.status(200).json({ message: 'User updated and log created successfully' });

  } catch (error) {
    // Rollback the transaction if any error occurs
    await session.abortTransaction();
    console.error('Transaction failed:', error);
    res.status(500).json({ error: 'Transaction failed' });
  } finally {
    session.endSession(); // End the session
  }
};

module.exports = { updateUserAndLogChange };
//Task30
const mongoose = require('mongoose');
const User = require('../models/user.js');

// Update user age and create an audit log in a transaction
const updateUserAndLogChange = async (req, res) => {
  const { userId, newAge } = req.body;

  const session = await mongoose.startSession(); // Start a session

  try {
    session.startTransaction(); // Begin the transaction

    // Update the user's age in the User collection
    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new Error('User not found');
    }

    user.age = newAge;
    await user.save();

    // Create an audit log in the AuditLog collection
    const log = new AuditLog({
      action: 'User Age Update',
      details: `Updated age for user ${userId} to ${newAge}`,
    });

    await log.save({ session }); // Save audit log in the same transaction

    // Commit the transaction if all operations are successful
    await session.commitTransaction();
    res.status(200).json({ message: 'User updated and log created successfully' });

  } catch (error) {
    // Rollback the transaction if any error occurs
    await session.abortTransaction();
    console.error('Transaction failed:', error);
    res.status(500).json({ error: 'Transaction failed' });
  } finally {
    session.endSession(); // End the session
  }
};

module.exports = { updateUserAndLogChange };

....................
//Project
const Task = require('../models/task.js');
const User = require('../models/user.js');

// Create a new task
const createTask = async (req, res) => {
  const { title, description, status, dueDate, userId } = req.body;

  try {
    const user = await User.findById(userId); // Find the user by ID
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const task = new Task({
      title,
      description,
      status,
      dueDate,
      user: userId,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Get tasks filtered by status or due date
const getTasks = async (req, res) => {
  const { status, dueDate } = req.query;

  const filters = {};
  if (status) filters.status = status;
  if (dueDate) filters.dueDate = new Date(dueDate);

  try {
    const tasks = await Task.filterTasks(filters);
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

module.exports = { createTask, getTasks };
