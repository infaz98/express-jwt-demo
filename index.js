const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

//Middleware
app.use(express.json());

dotenv.config();

//Connect to the DB
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true,  useUnifiedTopology: true}, ()=> {
	console.log('Connected to the DB');
});

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, ()=>{
	console.log(`Server is running on http://localhost:3000`);
});
