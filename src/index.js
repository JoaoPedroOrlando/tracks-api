require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const dotenv = require('dotenv');
const requireAuth = require('./middlewares/requireAuth');
const MY_KEY = process.env.TOKEN_KEY;
dotenv.config({ path: '../.env' });
//object which represents the entire aplication
const app  = express();

//automatically will handle the json request
app.use(express.json());
app.use(authRoutes);
app.use(trackRoutes);

//mongo connection setup
const mongoUri = 'mongodb+srv://admin:admin@cluster0.miczbhu.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoUri);
mongoose.connection.on('connected', ()=>{
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error',(err)=>{
    console.log('Error connecting to mongo',err);
});

//everytime someone does a http request to the root rout run this function
app.get('/',requireAuth, (req,res)=>{
    res.send(`Your email: ${MY_KEY}`);
});

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
});