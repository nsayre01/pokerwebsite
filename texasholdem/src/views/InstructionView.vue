<template>
    <div class="instructions">
      <h1>This is the instructions page</h1>
  
      <!-- Button to go back to home menu -->
      <router-link to="/">
      <button class="instructionbutton">BACK</button>
      </router-link>
    </div>
  </template>

  <style>
    .instructionbutton {
  background-color: transparent; /* Green */
  border: 3px solid #4CAF50;
  color: #4CAF50; 
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  text-transform: uppercase;
  border-radius: 100px;
  cursor: pointer; 
  transition: 1.5s;
}

.instructionbutton:hover {
  box-shadow: 0 5px 50px 0 #4CAF50 inset,
              0 5px 50px 0 #4CAF50;
}
  </style>