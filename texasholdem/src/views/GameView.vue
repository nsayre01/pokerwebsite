<template>
    <div class="game">
      <h1>This where the game will be displayed and played</h1>

      <div class="container">
		    <div class="table">
			    <div class="card"></div>
			    <div class="card"></div>
			    <div class="card"></div>
			    <div class="card"></div>
			    <div class="card"></div>
		    </div>
	    </div>


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


.container {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100vh;
			background-color: #2c3e50;
		}
		
		.table {
			position: relative;
			width: 600px;
			height: 400px;
			background-color: green;
			border: 10px solid #8b4513;
			border-radius: 50%;
			box-shadow: 0px 0px 10px #8b4513;
		}

    .card {
			position: absolute;
			width: 60px;
			height: 90px;
			border: 3px solid white;
			border-radius: 5px;
			background-color: transparent;
			top: 155px;
		}
		
		.card:nth-child(1) {
			left: calc(50% - 190px);
		}
		
		.card:nth-child(2) {
			left: calc(50% - 110px);
		}
		
		.card:nth-child(3) {
			left: calc(50% - 30px);
		}
		
		.card:nth-child(4) {
			left: calc(50% + 50px);
		}
		
		.card:nth-child(5) {
			left: calc(50% + 130px);
		}

</style>