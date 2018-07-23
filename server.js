// Importing the libraries needed
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const customerRoutes = require ('./routes/customer.route');

const app = express();

// Connect to database
mongoose.connect('mongodb://localhost:27017/example', {useNewUrlParser: true});

// Configure to use body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configure to use cors()
app.use(cors());

// Define base path
app.use('/customers', customerRoutes);

const port = process.env.PORT || 4500;
const server = app.listen(port, function(){
    console.log('listening on port: '+port);
});