// Setup empty JS object to act as endpoint for all routes

projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();


// Start up an instance of app

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
app.listen(port,()=>{
    console.log('The web server is :  http://localhost:'+ port);
})

// this request the spesific information from the client side
app.post('/mans',(req,res)=>{
    projectData.cityName = req.body.city;
    projectData.tempreture = req.body.temprature;
    projectData.fellings = req.body.fellings;
    projectData.sky = req.body.sky;
    res.send(projectData);
})

app.get('/mans',(req,res)=>{
    res.send(projectData);
})



