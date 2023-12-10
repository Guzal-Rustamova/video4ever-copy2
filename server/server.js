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

const mysql = require('mysql2'); 
const connection = mysql.createConnection({
  host: 'db.redhawks.us',
  user: 'nchs_se', 
  password: 'temp2023!',
  database: 'video4ever'
});
connection.connect((err) => 
{
  if (err) {
    console.log("Error connecting to the database", err);
  }else {
    console.log("Connected to the database!");
  }
})


// This is an example GET request endpoint
// req is the request object that was sent
// res is the result object of the request
// The result is converted to a JSON object with a key of message and value "Hello from server!"
app.get('/branches', (req, res) => {
  const sql = 'SELECT BranchNum as value, BranchName as label '
  + ' FROM Branch ';

    
    
    connection.query(sql, (err, data) => {
      if (err) return res.json(err);  
      return res.json(data); 
    })
  
});

app.get('/movies', (req, res) => {
  const sql = 'SELECT Title, Price, DirectorFirst, DirectorLast, OnHand '
+ ' FROM Movie, Director, Directed, Inventory'
+ ' WHERE Director.DirectorNum = Directed.DirectorNum'
+ ' AND Movie.MovieCode = Inventory.MovieCode'
+ ' AND Movie.MovieCode = Directed.MovieCode'
+ ` AND Inventory.BranchNum = ${req.query.branch}`;

  connection.query(sql, (err, data) => {
    if (err) return res.json(err);  
    return res.json(data); 
  })
})


// This will check if the server is running on port 8000
// If you change the port number here, you also have to change the baseURL in App.js
app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });