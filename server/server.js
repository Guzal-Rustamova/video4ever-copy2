// Video4Ever Starter Code for Node.js Server
// Dr. Miller
// Start your server using npm run dev in the server directory
// You can setup your own server following the instructions at https://codedamn.com/news/reactjs/how-to-connect-react-with-node-js


// Express is a Node.js framework for handling routing
// Express determines what function to call based on the endpoint specified
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// This is an example GET request endpoint
// req is the request object that was sent
// res is the result object of the request
// The result is converted to a JSON object with a key of message and value "Hello from server!"
app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
    const mysql = require('mysql2'); 

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'nchs_se', 
    password: 'temp2023!',
    database: 'db.redhawks.us'
  });

  

  connection.connect(function(err) {
    if (err) 
    {
      console.log("Error connecting to the database", err);
    }
    console.log("Connected!");

    connection.query("Set @num = SELECT MovieCode FROM Inventory; Set @movie = SELECT Title FROM Movie;")
  });
});


// This will check if the server is running on port 8000
// If you change the port number here, you also have to change the baseURL in App.js
app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });