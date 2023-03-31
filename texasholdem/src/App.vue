<template>
  <div>
    <h1>
    {{ title }}
  </h1>

  <!-- insert space between addplayer and start button -->
  <br>

  <!-- Button to start game on new line -->
  <button @click="startGame">START GAME</button>

  <br>

  <!-- Button to go to OPTIONS menu -->
  <button @click="goToOptions">OPTIONS</button>

  <br>

  <button @click="goToInstructions">INSTRUCTIONS</button>

  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      title: 'Texas Hold Em'
    }
  },
  methods: {
    handleclick() {
      console.log(this.$refs.player_name.value)
    }
  }
}
</script>

<style>
body {
  background: #07252d;
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

h1 {
  font-family: 'Old Western', cursive;
  font-size: 72px;
  color: #0e3742;
  text-transform: uppercase;
  text-align: center;
  margin-top: 150px;
  outline: none;
  animation: animate 20s linear infinite;
}
@keyframes animate 
{
  0%,18%,20%,50.1%,60%,65.1%,80%,90.1%,92%
  {
    color: #fff;
    text-shadow: 0 0 10px #03bcf4,
                0 0 20px #03bcf4,
                0 0 40px #03bcf4,
                0 0 80px #03bcf4,
                0 0 160px #03bcf4;
  }
  18.1%,28.1%,65%,100%
  {
    color: #0e3742;
    text-shadow: none;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: #07252d;
}

button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 50px;
}

button:hover {
  background-color: #3e8e41; /* Darker green */
}

button.clicked {
  background-color: #f44336; /* Red */
}
</style>
