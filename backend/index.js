// imported modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// the app instance
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// connect to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
});

// import the route definition files
const exercisersRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// the root routes for using the APIs
app.use('/exercises', exercisersRouter);
app.use('/users', usersRouter );

// start the server on port
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});