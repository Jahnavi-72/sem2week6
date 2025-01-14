//Task17
// routes/userRoutes.js
const express = require('express');
const { createUser } = require('../controller/controller.js');

const router = express.Router();

router.post('/register', createUser);

module.exports = router;
//Taskk18
const express = require('express');
const { createUser, getUsers } = require('../controller/controller.js'); // Import controller functions

const router = express.Router();

// Route to create a user
router.post('/', createUser);

// Route to get all users
router.get('/', getUsers);

module.exports = router;
//Task20
const express = require('express');
const UserController = require('../controller/controller.js');

const router = express.Router();

// Define routes for the User resource
router.post('/users', UserController.createUser);      // Create a new user
router.get('/users/:id', UserController.getUser);      // Get user by ID
router.get('/users', UserController.getAllUsers);      // Get all users

module.exports = router;
//Task23
const express = require('express');
const { groupUsersByAge } = require('../controller/controller.js');

const router = express.Router();
router.get('/group-by-age', groupUsersByAge);

module.exports = router;
//Task25
const express = require('express');
const { createUser } = require('../controller/controller.js');

const router = express.Router();

// Route to create a new user
router.post('/', createUser);

module.exports = router;
//Task26
const express = require('express');
const { createUser } = require('../controller/controller.js');

const router = express.Router();

// Route to create a new user
router.post('/', createUser);

module.exports = router;
//Task27
const express = require('express');
const { getUserAccountAge } = require('../controller/controller.js');

const router = express.Router();

// Route to get account age of a user
router.get('/:userId/account-age', getUserAccountAge);

module.exports = router;
//Task28
const express = require('express');
const { findUsersByFirstLetter } = require('../controller/controller.js');

const router = express.Router();

// Route to find users by the first letter of their name
router.get('/by-first-letter/:letter', findUsersByFirstLetter);

module.exports = router;
//Task30
const express = require('express');
const { updateUserAndLogChange } = require('../controller/controller.js');

const router = express.Router();

// Route to update user age and create an audit log
router.put('/update-age', updateUserAndLogChange);

module.exports = router;
................................
//Project
const express = require('express');
const { createTask, getTasks } = require('../controller/controller.js');

const router = express.Router();

// Route to create a new task
router.post('/tasks', createTask);

// Route to get tasks filtered by status or due date
router.get('/tasks', getTasks);

module.exports = router;