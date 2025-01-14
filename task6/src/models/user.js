//Task3
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  
  },
  email: {
    type: String,
    required: true,
    unique: true,  
  },
  age: {
    type: Number,
    required: true,  
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
//Task5
const mongoose = require('mongoose');

// 1. Define the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,    // This field is required
  },
  email: {
    type: String,
    required: true,    // This field is required
    unique: true,      // This ensures email addresses are unique
  },
  age: {
    type: Number,
    required: true,    // This field is required
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current date/time
  },
});

const User = mongoose.model('User', userSchema);

// 3. Export the model
module.exports = User;
//Task6
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User; // Export the model
//Task7
// user.js (Model)
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, default: null },
  createdAt: { type: Date, default: Date.now },
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
//Task8
// user.js (Model)
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, default: null },
  createdAt: { type: Date, default: Date.now },
});


const User = mongoose.model('User', userSchema);

module.exports = User;
//Task9
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});
module.exports = mongoose.model('User', userSchema);
//Task10
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
//TAsk11
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

module.exports = mongoose.model('User', userSchema);
//Task12
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model('User', userSchema);

module.exports = User;  // Export the model to use it in other files
//Task14
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User; // Export the model
//Task15
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User; // Export the model
//Task16
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // Array of references to Post
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
//Task17
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Pre-save middleware to hash the password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if password is not modified

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', userSchema);
//Task18
const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

// Post middleware to log after saving
userSchema.post('save', function (doc) {
  console.log(`Document with ID ${doc._id} has been saved.`);
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
//Task19
// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

// Virtual property to combine firstName and lastName into fullName
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
//Task20
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  birthDate: { type: Date, required: true },
});

// Define virtual for fullName
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Define virtual for age
userSchema.virtual('age').get(function() {
  const currentYear = new Date().getFullYear();
  const birthYear = this.birthDate.getFullYear();
  return currentYear - birthYear;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
//Task21
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql', 
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      isEmail: true,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
User.addIndex({
  fields: ['email'],
  unique: true, 
});
(async () => {
  await sequelize.sync({ force: false }); 
  console.log('Database synced');
})();

module.exports = User;
//Task22
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql', 
  logging: false,   
});
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      isEmail: true, 
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['email'], 
    },
  ],
});

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    await sequelize.sync({ force: false }); 
    console.log('User model synchronized!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};
//Task23
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

module.exports = mongoose.model('User', userSchema);

//Task24
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

module.exports = mongoose.model('User', userSchema);
//Task25
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 18 && value <= 65; // Age must be between 18 and 65
      },
      message: 'Age must be between 18 and 65 years old.',
    },
  },
});

module.exports = mongoose.model('User', userSchema);
//Task26
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 18 && value <= 65; // Age must be between 18 and 65
      },
      message: 'Age must be between 18 and 65 years old.',
    },
  },
});

module.exports = mongoose.model('User', userSchema);
//Task27
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { 
    type: Number, 
    required: true, 
    validate: {
      validator: function (value) {
        return value >= 18 && value <= 65; // Age must be between 18 and 65
      },
      message: 'Age must be between 18 and 65 years old.',
    },
  },
  createdAt: { type: Date, default: Date.now }, // Automatically set when the document is created
});

// Schema method to calculate account age
userSchema.methods.getAccountAge = function () {
  const now = new Date();
  const accountAgeInMs = now - this.createdAt; // Difference in milliseconds
  const accountAgeInDays = Math.floor(accountAgeInMs / (1000 * 60 * 60 * 24)); // Convert to days
  return accountAgeInDays;
};

module.exports = mongoose.model('User', userSchema);
//Task28
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { 
    type: Number, 
    required: true, 
    validate: {
      validator: function (value) {
        return value >= 18 && value <= 65; // Age must be between 18 and 65
      },
      message: 'Age must be between 18 and 65 years old.',
    },
  },
  createdAt: { type: Date, default: Date.now }, // Automatically set when the document is created
});

// Static method to find users by the first letter of their name
userSchema.statics.findByFirstLetter = async function (letter) {
  const regex = new RegExp(`^${letter}`, 'i'); // Case-insensitive match for the first letter
  return this.find({ name: regex });
};

module.exports = mongoose.model('User', userSchema);
//Task29
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
//Task30
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
....................................................
//Project
const express = require('express');
const { createTask, getTasks } = require('../controller/controller.js');

const router = express.Router();

// Route to create a new task
router.post('/tasks', createTask);

// Route to get tasks filtered by status or due date
router.get('/tasks', getTasks);

module.exports = router;
.....................................
//Project
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Export User model
module.exports = mongoose.model('User', userSchema);