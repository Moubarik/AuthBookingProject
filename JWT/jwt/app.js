const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
// takes any json data comes with a request and parse it into javascript object 
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://moubarik:mbk@cluster0.setqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/rooms', requireAuth, (req, res) => res.render('rooms'));
app.use(authRoutes);

// cookies
// app.get('/set-cookies', (req,res)=> {
//   // res.setHeader('Set-cookie', 'newUser=true');
//   res.cookie('newUser', false);
//   res.cookie('isEmployee', true, { maxAge: 100 * 60 * 60 * 24 , httpOnly: true });
//   res.send('You got the cookie');
// }) ;


// app.get('/read-cookies', (req,res) => {
// const cookies = req.cookies; 
// console.log(cookies.newUser);
// res.json(cookies);
// });