//Task1
const express =require('express');
const app=express();
const connectToMongoDB=require('../Task1/Config/config.js');
const dotenv=require('dotenv');
dotenv.config();
app.use(express.json());

app.listen(8001,()=>{
    console.log("server is running....");
    connectToMongoDB();
})
//Task2
const express =require('express');
const app=express();
const connectToMongoDB=require('../Task1/Config/config.js');
const dotenv=require('dotenv');
dotenv.config();
app.use(express.json());

app.listen(8001,()=>{
    console.log("server is running....");
    connectToMongoDB();
})
//Task3
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoURI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/userdb';
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error in connecting DB:', error.message);
  }
};
module.exports = connectToMongoDB;
//Task4
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../Task3/models/user.js'); // Make sure this path is correct

const app = express();
dotenv.config();
app.use(express.json());

const mongoURI = process.env.MONGO_DB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;

  // Validate input
  if (!name || !email || !age) {
    return res.status(400).json({ message: 'All fields (name, email, age) are required' });
  }

  try {
    const user = new User({ name, email, age });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user: ' + error.message });
  }
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//Task5
const mongoose = require('mongoose');
const User = require('../Task5/Config/config.js'); // Import the User model

const connectToMongoDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("mongodb connected");
    }catch(error){
        console.log("Error in connecting DB",error.message)
    }
}
 

// Create a new user
const createUser = async () => {
  const newUser = new User({
    name: 'John Doe',
    email: 'johndoe@example.com',
    age: 30,
  });

  try {
    const savedUser = await newUser.save();
    console.log('User created:', savedUser);
  } catch (err) {
    console.log('Error creating user:', err);
  }
};

createUser();
//Task6
const express = require('express');
const mongoose = require('mongoose');
const config = require('./Config/config.js');
const User = require('../Task6/models/user.js'); 
const app = express();
app.use(express.json());
mongoose
  .connect(config.mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
app.get('/', (req, res) => {
  res.send('Welcome to the Express Server!');
});
app.post('/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age }); 
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
//Task7
// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const MONGO_URI = process.env.MONGO_URI ||'mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/'

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
//Task8
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('../Task8/controller/controller.js'); 
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


app.listen(3500, () => {
  console.log(`Server is running on port ${PORT}`);
});
//Task9
const express = require('express');
const mongoose = require('mongoose');
const userController = require('../Task9/controller/controller.js');

const MONGO_URI = 'mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/'; 

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

const app = express();

app.use(express.json());

app.delete('/users/:id', userController.deleteUserById);

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
//Task10
const express = require('express');
const mongoose = require('mongoose');
const userController = require('../Task10/controller/controller.js');
require('dotenv').config();

// MongoDB connection URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/';

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

const app = express();
//Task11
const express = require('express');
const mongoose = require('mongoose');
const userController = require('../Task11/Controller/controller.js');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

const app = express();
app.use(express.json());

// Define the route
app.get('/users', userController.getUsersByNamePrefix);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
//Task13
const express = require('express');
const mongoose = require('mongoose');
const userController = require('../Task12/controller/controller.js'); // Import controller

const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/users', userController.getUsers);
mongoose.connect('mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//Task14

const express = require('express');
const mongoose = require('mongoose');
const postController = require('../Task14/controller/controller.js'); // Import Post controller

const app = express();
const PORT = 8050;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.post('/posts', postController.createPost); // Route to create a post
app.get('/posts', postController.getAllPosts); // Route to get all posts


mongoose.connect('mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//Task15
const express = require('express');
const mongoose = require('mongoose');
const postController = require('../Task15/controller/controller.js');

const app = express();
const PORT = 8100;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/posts', postController.getPostsWithUserDetails); // Fetch posts with user details

// Connect to MongoDB
mongoose.connect('mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//Task16
const express = require('express');
const mongoose = require('mongoose');
const userController = require('../Task16/controller/controller.js');
const postController = require('../Task16/controller/postcontroller.js');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// User routes
app.post('/users', userController.createUser);
app.get('/users/:userId/posts', userController.getUserWithPosts); // Get user with their posts

// Post routes
app.post('/posts', postController.createPost);

// Connect to MongoDB
mongoose.connect('mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//Task17
// server.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('../Task17/routes/router.js');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
//Task18
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('../Task18/routes/routes.js'); // Import routes

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Database connection error:', err));
//Task19
// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { getUsers, createUser } = require('../Task19/controller/controller.js');

const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Routes
app.get('/users', getUsers);  // Get all users
app.post('/users', createUser);  // Create a new user

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
//Task20
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');

// Create an Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', routes);

// Connect to MongoDB
mongoose.connect( { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//Task21
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//Task22
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const User = require('../Task22/models/user.js'); 

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql', 
});
const populateDatabase = async () => {
  console.log('Populating database with 1 million records...');
  const bulkData = [];
  for (let i = 0; i < 1000000; i++) {
    bulkData.push({
      email: faker.internet.email(),
      name: faker.name.findName(),
    });
  }
  await User.bulkCreate(bulkData);
  console.log('Database populated successfully!');
};
const benchmarkQuery = async () => {
  console.log('Benchmarking queries...');
  console.time('Query Without Index');
  await User.findAll({
    where: { email: 'test@example.com' },
  });
  console.timeEnd('Query Without Index');

  console.time('Query With Index');
  await User.findAll({
    where: { email: 'test@example.com' },
  });
  console.timeEnd('Query With Index');
};

// Run Tests
const runTests = async () => {
  await sequelize.authenticate();
  console.log('Database connected!');

  await sequelize.sync({ force: false }); 
  console.log('Database synced!');

  await benchmarkQuery();
};

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await runTests();
});
//Task23
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('../Task23/routes/routes.js');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


mongoose.connect('mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use('/api/users', userRoutes);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
//Task24
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('../Task24/routes/routes.js');

const app = express();
const PORT = process.env.PORT || 3100;

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// MongoDB Connection
mongoose.connect('mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Routes
app.use('/api/users', userRoutes); // Use user routes for handling requests

// Default route for testing server
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
//Task25
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('../Task25/routes/routes.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Routes
app.use('/api/users', userRoutes); // Handle user-related requests

// Root route for testing the server
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
//Task26
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('../Task26/routes/routes.js');

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());

mongoose.connect('mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
//Task27
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('../Task27/routes/routes.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

// User routes
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
//Task28
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('../Task28/routes/routes.js'); // Import user routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

// User routes
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('User API is running...');
});

// Error handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
//Task29
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('../Task29/routes/routes.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

// User routes
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
//Task30
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('../Task30/routes/routes.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

// User routes
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
.......................................................................
//Project
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('../Project/routes/routes.js'); // Import user routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Anuhya:12345678900@cluster-1.ancjw.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

// User routes
app.use('/api', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Task Management API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});