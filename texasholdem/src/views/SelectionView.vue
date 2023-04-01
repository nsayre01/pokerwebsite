<template>
    <div class="selection">
      <h1>This is the page where you input 
        the players' names and buy-in amounts
      </h1>

      <!-- Button to Start the game -->
        <router-link to="/game">
        <button>START</button>
        </router-link>
  
      <!-- Button to go back to home menu -->
      <router-link to="/">
      <button>BACK</button>
      </router-link>
    </div>
  </template>