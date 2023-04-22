<template>
    <div class="selection">
      <form>
      <div class="player-one">
        
        <div class="player-one-name">
          {{ form.nameOne }}
        </div>

        <div class="player-one-icon-box"></div>

        <div>
          <input class="player-one-name-input" v-model="form.nameOne" type="text" placeholder="Player One Name"><br><br>
        </div>

        <input class="player-one-buyin" type="number" v-model="form.buyinOne" placeholder="Player One Buyin"><br><br>

      </div>

     
      <div class="player-two">
        
        <div class="player-two-name">
          {{ formTwo.nameTwo }}
        </div>

        <div class="player-two-icon-box"></div>

        <div>
          <input class="player-two-name-input" v-model="formTwo.nameTwo" type="text" placeholder="Player Two Name"><br><br>
        </div>

        <input class="player-two-buyin" type="number" v-model="formTwo.buyinTwo" placeholder="Player Two Buyin"><br><br>

      </div>
    </form>


      <router-link to="/game">
      <button class="selectionbutton" type="submit" @click="onSubmit">START</button>
      </router-link>
  
      <router-link to="/">
      <button class="selectionbutton">BACK</button>
      </router-link>
    </div>
</template>

<script>
import { ref, onMounted, watch, computed, reactive } from 'vue'
import { createUser } from '@/firebase'

  //pass the player one and two data to firebase
  //then pass the player one and two data to the game view

export default {
  setup() {
    const form = reactive({
      nameOne: '',
      buyinOne: 1000
    })

    //create another form for the player two data
    const formTwo = reactive({
      nameTwo: '',
      buyinTwo: 1000
    })

    const onSubmit = async () => {
      await createUser( { ...form })
      form.buyinOne = 1000,
      formTwo.buyinTwo = 1000,
      form.nameOne = "Player One",
      formTwo.nameTwo = "Player Two"
      console.log(form)
    }

    return { form, formTwo, onSubmit }

  }
}
  
  



  /*
  data() 
  {
    return {
      playerNumberOne: 1,
      nameOne: "Logan",
      handOne: ["3c", "4c"],
      buyinOne: 1000,
      playerNumberTwo: 2,
      nameTwo: "Kioni",
      handTwo: ["7s", "8s"],
      buyinTwo: 2000,
    }
  },
  methods: {
    async submitPlayerData() {
      let playerOneResult = axios.post('http://localhost:3000/players', {
        playerNumber: this.playerNumberOne,
        name: this.nameOne,
        hand: this.handOne,
        buyin: this.buyinOne
      });

      let playerTwoResult = axios.post('http://localhost:3000/players', {
        playerNumber: this.playerNumberTwo,
        name: this.nameTwo,
        hand: this.handTwo,
        buyin: this.buyinTwo
      });

      console.warn(result);
    }
  }
  */ 
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

.player-one-buyin {
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
  width:50%;
  outline:0;
}

.player-two-buyin {
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
  width:50%;
  outline:0;
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