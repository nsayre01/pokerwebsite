<template>
    <div class="selection">
      <div class="player-one">
        <div class="player-one-name">
          {{ playerNameOne }}
        </div>

        <div class="player-one-icon-box"></div>

        <div>
          <input class="player-one-name-input" v-model="playerNameOne" type="text"><br><br>
        </div>

        <div class="increasedecreaseone">
          <button @click="decreaseMoneyOne">-</button>
            <span class="money">{{ moneyOne }}</span>
          <button @click="increaseMoneyOne">+</button>
        </div>
      </div>

      <div class="player-two">
        <div class="player-two-name">
          {{ playerNameTwo }}
        </div>

        <div class="player-two-icon-box">
        </div>

        <div>
          <input class="player-two-name-input" v-model="playerNameTwo" type="text"><br><br>
        </div>

        <div class="increasedecreasetwo">
          <button @click="decreaseMoneyTwo">-</button>
            <span class="moneyOne">{{ moneyTwo }}</span>
          <button @click="increaseMoneyTwo">+</button>
        </div>
      </div>

      <router-link to="/game">
      <button class="selectionbutton">START</button>
      </router-link>
  
      <router-link to="/">
      <button class="selectionbutton">BACK</button>
      </router-link>
    </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue'

  export default {
    setup () {
      const moneyOne = ref(1000),
        playerNameOne = ref("Player One"),
        moneyTwo = ref(1000),
        playerNameTwo = ref("Player Two")

      const increaseMoneyOne = () => {
        moneyOne.value += 100
      }

      const decreaseMoneyOne = () => {
        moneyOne.value -= 100
      }

      const increaseMoneyTwo = () => {
        moneyTwo.value += 100
      }

      const decreaseMoneyTwo = () => {
        moneyTwo.value -= 100
      }

      return {
        moneyOne,
        increaseMoneyOne,
        decreaseMoneyOne,
        playerNameOne,
        moneyTwo,
        increaseMoneyTwo,
        decreaseMoneyTwo,
        playerNameTwo
      }
    }
  }

</script>

<style>

.selectionbutton {
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

.selectionbutton:hover {
  box-shadow: 0 5px 50px 0 #4CAF50 inset,
              0 5px 50px 0 #4CAF50;
}

.player-one-name {
  font-size: 60px;
  margin-left: 20px;
  margin-right: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  color: purple;
  text-shadow: 0 0 10px purple,
                0 0 20px purple,
                0 0 40px purple,
                0 0 80px purple,
                0 0 160px purple;
}

.player-one {
  margin-top: 50px;
  margin-bottom: 10px;
  border-radius: 10px;
  background: #081e24;
  box-shadow: #081e24;
  color: purple;
  font-size: 20px;
  text-shadow: 0 0 10px purple,
                0 0 20px purple,
                0 0 40px purple,
                0 0 80px purple,
                0 0 160px purple;
}

.player-one-icon-box {
  width: 200px;
  height: 200px;
  border: 3px solid purple;
  border-radius: 100px;
  margin: 0 auto;
}

.player-one-name-input {
  color:white;
  font-weight:500;
  font-size: 18px;
  border-radius: 5px;
  line-height: 22px;
  background-color: transparent;
  border:2px solid purple;
  transition: all 0.3s;
  padding: 13px;
  margin-top: 30px;
  width:80%;
  outline:0;
}

.increasedecrease {
  color: purple;
  font-size: 20px;
  text-shadow: 0 0 10px purple,
                0 0 20px purple,
                0 0 40px purple,
                0 0 80px purple,
                0 0 160px purple;
}



.player-two-name {
  font-size: 60px;
  margin-left: 20px;
  margin-right: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  color: orange;
  text-shadow: 0 0 10px orange,
                0 0 20px orange,
                0 0 40px orange,
                0 0 80px orange,
                0 0 160px orange;
}

.player-two {
  margin-top: 50px;
  margin-bottom: 10px;
  background: #081e24;
  box-shadow: #081e24;
  color: orange;
  font-size: 20px;
  text-shadow: 0 0 10px orange,
                0 0 20px orange,
                0 0 40px orange,
                0 0 80px orange,
                0 0 160px orange;
}

.player-two-icon-box {
  width: 200px;
  height: 200px;
  border: 3px solid orange;
  border-radius: 100px;
  margin: 0 auto;
}

.player-two-name-input {
  color:white;
  font-weight:500;
  font-size: 18px;
  border-radius: 5px;
  line-height: 22px;
  background-color: transparent;
  border:2px solid orange;
  transition: all 0.3s;
  padding: 13px;
  margin-top: 30px;
  width:80%;
  outline:0;
}

.increasedecreasetwo {
  color: orange;
  margin-bottom: 5px;
  font-size: 20px;
  text-shadow: 0 0 10px orange,
                0 0 20px orange,
                0 0 40px orange,
                0 0 80px orange,
                0 0 160px orange;
}

</style>