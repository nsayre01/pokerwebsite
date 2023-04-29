<template>
  <div class="options">
    <head>
    <meta charset="utf-8">
    <title>Volume Slider</title>
    <link rel="stylesheet" href="volslider.css">
</head>

        <div class="slider">
            <input type="range" min="0" max="100" value="50">
        </div>

    <!-- Button to go back to home menu -->
    <router-link to="/">
    <button class="optionbutton">BACK</button>
    </router-link>
  </div>
</template>
<style>

.optionbutton {
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
  margin: 100px;
}

.optionbutton:hover {
  box-shadow: 0 5px 50px 0 #4CAF50 inset,
              0 5px 50px 0 #4CAF50;
}
</style>
