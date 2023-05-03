<template>
    <div class="game">
      <h2>{{gameText}}</h2>
      <button  @click=""> OK</button>
      


      <div class="container">
        

        <div class="card">
		      <div class="suit">
            {{ onehand[0].suit }}
          </div>
		      <div class="rank-bottom">
            {{ onehand[0].rank }}
          </div>
          <div class="rank-top">
            {{ onehand[0].rank }}
          </div>
        </div>

        <div class="card">
		      <div class="suit">
            {{ onehand[1].suit }}
          </div>
		      <div class="rank-bottom">
            {{ onehand[1].rank }}
          </div>
          <div class="rank-top">
            {{ onehand[1].rank }}
          </div>
        </div>

		    <div class="table">
			    <div v-show="flop" class="river">
            <div class="card">
		      <div class="suit">
            {{ board[0].suit }}
          </div>
		      <div class="rank-bottom">
            {{ board[0].rank }}
          </div>
          <div class="rank-top">
            {{ board[0].rank }}
          </div>
        </div>
          </div>

          <div v-show="flop" class="river">
            <div class="card">
		      <div class="suit">
            {{ board[1].suit }}
          </div>
		      <div class="rank-bottom">
            {{ board[1].rank }}
          </div>
          <div class="rank-top">
            {{ board[1].rank }}
          </div>
        </div>
          </div>

			    <div v-show="flop" class="river">
            <div class="card">
		      <div class="suit">
            {{ board[2].suit }}
          </div>
		      <div class="rank-bottom">
            {{ board[2].rank }}
          </div>
          <div class="rank-top">
            {{ board[2].rank }}
          </div>
        </div>

          </div>
			    <div class="river"></div>
			    <div class="river"></div>

          <div ref = 'test' id ="rOne" class="button-box" >
            <button @click="getInput('call')" class="call">Call</button>
            <button @click="getInput('raise')"  class="raise">Raise</button>
            <button @click="getInput('fold')"  class="fold">Fold</button>
            <button @click="getInput('check')"  class="check">Check</button>
          </div>

          <div id = "playerTwo" class="button-box-two">
            <button class="call" @click="">Call</button>
            <button class="raise">Raise</button>
            <button class="fold">Fold</button>
            <button class="check">Check</button>
          </div>

		    </div>

        <div class="card">
		      <div class="suit">
            {{ twohand[0].suit }}
          </div>
		      <div class="rank-bottom">
            {{ twohand[0].rank }}
          </div>
          <div class="rank-top">
            {{ twohand[0].rank }}
          </div>
        </div>

        <div class="card">
		      <div class="suit">
            {{ twohand[1].suit }}
          </div>
		      <div class="rank-bottom">
            {{ twohand[1].rank }}
          </div>
          <div class="rank-top">
            {{ twohand[1].rank }}
          </div>
        </div>
	    </div>




      <!-- Button to go back to home menu -->
      <router-link to="/">
      <button class="homebutton">HOME</button>
      </router-link>
    </div>
</template>

<script>
import { ref, onMounted, watch, computed, reactive } from 'vue';
import axios from 'axios';
import Game from '@/game.js'



//import HandEval as a module
//import HandEval from 'HandEval'
let HandEval = require('@/HandEval')

// Define card suits and ranks
const suits = ['❤', '♦', '♣', '♠'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Create a list of cards
let deck = [];
for (let i = 0; i < suits.length; i++) {
  for (let j = 0; j < ranks.length; j++) {
    deck.push({ suit: suits[i], rank: ranks[j] });
  }
}

// Shuffle the deck using the Fisher-Yates algorithm
//may need to use different algorithm
for (let i = deck.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [deck[i], deck[j]] = [deck[j], deck[i]];
}

// Deal two cards from the top of the shuffled deck
//const onehand = [deck[0], deck[1]];
//const twohand = [deck[5], deck[7]];
const bothand = [deck[9], deck[12]];
//console.log('Your hand:', onehand);
//console.log('Your opponent\'s hand:', twohand);
console.log(bothand);

export default {
  setup() {
    
    let game = new Game();

    game.setup()
    //game.preflop()
    game.flop()
    
    const playerOne = game.getPlayers()[0]
    
    let gameText = reactive(game.text)
    console.log([game.getPlayers()[0].getHand()[0],game.getPlayers()[0].getHand()[1] ]);
    const onehand = [game.getPlayers()[0].getHand()[0],game.getPlayers()[0].getHand()[1] ];
    const twohand = [game.getPlayers()[1].getHand()[0],game.getPlayers()[1].getHand()[1] ];
    console.log(localStorage.getItem('currMove'))
    const board = game.getBoard()
    console.log(board)
    //game.setup();
    //game.flop();
  
    
    const getInput =  async (type) => { 
      console.log(type)
      
    }
    
    return {
      oneName: localStorage.getItem('oneName'),
      twoName: localStorage.getItem('twoName'),
      oneBuyin: localStorage.getItem('oneBuyin'),
      twoBuyin: localStorage.getItem('twoBuyin'),
      onehand: onehand,
      twohand: twohand,
      board: board,
      flop: true,
      gameText,
      getInput
    }
  }, 
  methods: {
    
  }

}

</script>

<style>

.card {
			width: 60px;
			height: 90px;
			border-radius: 10px;
			border: 1px solid black;
      background-color: black;
      color: white;
			position: relative;
			overflow: hidden;
			box-sizing: border-box;
			padding: 10px;
      padding-top: 50px;
      justify-content: center;
      align-items: center;
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px blue, 0 0 70px blue, 0 0 80px blue, 0 0 100px blue, 0 0 150px blue;
		}

		.card .suit {
			font-size: 30px;
			line-height: 0px;
			justify-content: center;
      align-items: center;
		}

		.card .rank-bottom {
			font-size: 20px;
			line-height: 10px;
			position: absolute;
			bottom: 10px;
			right: 10px;
		}

    .card .rank-top {
			font-size: 20px;
			line-height: 10px;
			position: absolute;
			top: 10px;
			left: 10px;
		}

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

.homebutton:hover {
  box-shadow: 0 5px 50px 0 #4CAF50 inset,
              0 5px 50px 0 #4CAF50;
}

.button-box {
  position: absolute; /* position the button-box absolutely */
  bottom: -170px; /* set the distance from the bottom edge of the parent container */
  left: -170px; /* set the distance from the left edge of the parent container */
  border: 5px solid purple;
  background-color: transparent;
  padding: 5px;
  display: flex; /* display the child elements vertically */
  justify-content: center; /* center the child elements horizontally */
}

.button-box button {
  background-color: transparent;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
}

.button-box button:hover {
  box-shadow: 0 5px 50px 0 purple inset,
              0 5px 50px 0 purple;
}

.button-box-two {
  position: absolute; /* position the button-box absolutely */
  bottom: -170px; /* set the distance from the bottom edge of the parent container */
  right: -170px; /* set the distance from the left edge of the parent container */
  border: 5px solid orange;
  background-color: transparent;
  padding: 5px;
  display: flex; /* display the child elements vertically */
  justify-content: center; /* center the child elements horizontally */
}

.button-box-two button {
  background-color: transparent;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
}

.button-box-two button:hover {
  box-shadow: 0 5px 50px 0 orange inset,
              0 5px 50px 0 orange;
}

.container {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 90vh;
      width: 80vw;
      background-position: 0;
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

    .river {
			position: absolute;
			width: 60px;
			height: 90px;
			background-color: transparent;
			top: 155px;
		}
		
		.river:nth-child(1) {
			left: calc(50% - 190px);
		}
		
		.river:nth-child(2) {
			left: calc(50% - 110px);
		}
		
		.river:nth-child(3) {
			left: calc(50% - 30px);
		}
		
		.river:nth-child(4) {
			left: calc(50% + 50px);
		}
		
		.river:nth-child(5) {
			left: calc(50% + 130px);
		}

</style>