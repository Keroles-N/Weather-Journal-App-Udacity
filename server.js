// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const port = 8888;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
app.listen( port, portInfo );


// Setup Server
function portInfo() {
    console.log(`Server is running on: http://localhost:${port}`);
}

 
//Get Data
app.get('/All', (request, response) => {
    response.send(projectData).status(200).end();
});

//post data

app.post('/postData', (request, response) => {
    newEntry = {
        temp:request.body.temp,
        date:request.body.date,
        content:request.body.content
    };
    projectData = newEntry;
    response.send(projectData).status(404).end();
});
