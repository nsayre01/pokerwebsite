<template>
    <div class="game">
      <h1>This where the game will be displayed and played</h1>

      <input type="text" v-model="name" placeholder="Player One Name"><br><br>
      <input type="number" v-model="buyin" placeholder="Player One Buyin"><br><br>
      <button v-on:click="submitPlayerData">Submit Player Data</button><br><br>


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
      let result = axios.post('http://localhost:3000/players', {
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