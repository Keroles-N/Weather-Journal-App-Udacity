// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
import cors from 'cors';
import { urlencoded, json } from 'body-parser';
import express, { static } from 'express';

const port = 8888;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(urlencoded({ extended: false }));
app.use(json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(static('website'));
app.listen( port, portInfo );


// Setup Server
app.listen(portInfo, () => {
    console.log(`Server is running on: http://localhost:${port}`);
});

 
//Get Data
app.get('/All', (request, response) => {
    response.send(projectData).status(200).end();
});

//post data

app.post('/postData', (request, response) => {
    projectData = {
        temp:request.body.temp,
        date:request.body.date,
        content:request.body.content
    };
    response.send(projectData).status(404).end();
});