// Video4Ever Starter Code
// Dr. Miller
// Start your React app using npm start while in the client directory

import './App.css';
import React, { useState, useEffect } from "react";
import Select from 'react-select';

  // You can use this function for sending POST requests You can modify it if you want to use it for GET requests as well
  // This is an asynchronous function meaning that it returns a Promise
  // A Promise means it will either return a valid value or reject the request
  // Promises are important for  operations that take time such as querying a database or fetching data from a server
  // Using await means this function will suspend execution until the Promise resolves so it won't return until it has a response
  // The await keyword only works in asynchronous functions
  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

function App() {
  // Use this variable whenever you want to connect to the Node.js server
  // When you create production version of a React app, this address will change
  const options = [
    {value: "downtown naperville", label: "Downtown Naperville"},
    {value: "downtown yorkville", label: "Downtown Yorkville"}, 
    {value: "south naperville", label: "South Naperville"}, 
    {value: "downtown oswego", label: "Downtown Oswego"},
  ];
 
  const baseURL = "http://localhost:8000/";

  const responsePromise = fetch(baseURL, options);


  const customStyles = { 
    option: (defaultStyles, state) => ({
      ...defaultStyles, 
      color: state.isSelected ? "#212529": "#fff",
      backgroundColor: state.isSelected ? "#a0a0a0" : "#212529", 
    }),

    control: (defaultStyles) => ({
      ...defaultStyles, 
      backgroundColor: "#212529", 
      padding: "10px", 
      border: "none", 
      boxShadow: "none",
    }),
    singleValue: (defaultStyles) => ({...defaultStyles, color: "#fff"}),
  }

  const [selected, setSelected] = useState(null); 

  const handleChange = (selectedOption) => {
    setSelected (selectedOption);
    console.log('Option selected:', selectedOption);
  };



  




  // This is an example variable (message) that can be changed with the setMessage function
  // The initial state of the message is an empty string. When the variable is changed, it changes everywhere it is used.
  // This is referred to as a state hook
  const [message, setMessage] = useState("");

  // useEffect will run when the app loads
  // This is referred to as an effect hook
  // This effect will modify the message based on what is returned from a GET request to the server's message 
  useEffect(() => {
    fetch(`${baseURL}message`)
      .then((res) => res.json())
      .then((data) => {setMessage(data.message);}
      );
  }, []);

  const[selectedBranch, setSelectedBranch] = useState("");
  const[movies, setMovies] = useState([]);

  useEffect(()=>{
    if (selectedBranch){
      fetch('http://localhost:8000/movies?branch=${selectedBranch}')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching data', error));
    }

  }, [selectedBranch]);

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  }



  // The message variable is displayed below and will update, if necessary
  // You can put any Javascript (JSX) code within curly brackets in a React app
  return (
    <div className="App">
      <header className="App-header">
        <div className="Menu"> 
          <Select options = {options} styles = {customStyles} onChange = {handleChange} autoFocus = {true}/>

          <div className = "app-data"> 
          {
            movies.map((movie) => React.createElement('div', {key: movie.MovieCode, className: 'movie item'}, 
              React.createElement('h2', {}, movie.Title), 
              React.createElement('p', {}, 'Director: ${movie.DirectorFirst} ${movie.DirectorLast'), 
              React.createElement('p', {}, 'Price: $${movie.Price'), 
              React.createElement('p', {}, 'On Hand: ${movie.Onhand'), 
              React.createElement('p', {}, 'Branch Number: ${movie.BranchNum')
            
            ))
          }
          
          </div>
        
        </div>
      </header>
      
    </div>
  );
        }; 


export default App;