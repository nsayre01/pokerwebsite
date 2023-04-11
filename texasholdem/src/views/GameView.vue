<template>
    <div class="game">
      <h1>This where the game will be displayed and played</h1>


      <!-- Button to go back to home menu -->
      <router-link to="/">
      <button>HOME</button>
      </router-link>
    </div>
  </template>

<script>
import { ref, onMounted, watch, computed, reactive } from 'vue';
import axios from 'axios';

//import HandEval as a module
//import HandEval from 'HandEval'
let HandEval = require('@/HandEval')

export default {
  name: 'PlayerData',
  data() 
  {
    return {
      playerNumber: 1,
      name: "Logan",
      hand: ["3c", "4c", "5c", "6c", "7c"],
      buyin: 1000
    }
  },
  methods: {
    async submitPlayerData() {
      let playerOneResult = axios.post('http://localhost:3000/players', {
        playerNumber: this.playerNumber,
        name: this.name,
        hand: this.hand,
        buyin: this.buyin
      }); 

      console.warn(result);
    }
  }
}

</script>

<style>

button {
  
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
  margin: 5px;
  margin-top: 30px;
}

button:hover {
  box-shadow: 0 5px 50px 0 #4CAF50 inset,
              0 5px 50px 0 #4CAF50;
}


</style>