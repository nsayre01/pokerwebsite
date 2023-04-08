<template>
    <div class="selection">

      <div class="player-one">
        <label for="player-one-icon">CHOOSE AN ICON:</label>
        <select name="icon-name" id="icon-names">
          <option value="joker">Joker</option>
          <option value="king">King</option>
          <option value="queen">Queen</option>
        </select>

        <br>
        <br>

        <form>
          <label for="name"> NAME:</label>
          <input type="text" id="name" name="name"><br><br>

        </form>

        <form>
          <label for="player-one-money">MONEY:</label>
          <input type="text" id="money" name="money"><br><br>
        </form>
    </div>


  <br>

        
      <!-- Button to Start the game -->
        <router-link to="/game">
        <button class="selectionbutton">START</button>
        </router-link>
  
      <!-- Button to go back to home menu -->
      <router-link to="/">
      <button class="selectionbutton">BACK</button>
      </router-link>
    </div>
</template>

<script>
  function passData() {
    var userInput = document.getElementById("userinput").value;
    myfunction(userInput);
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
  margin-top: 300px;
}

.selectionbutton:hover {
  box-shadow: 0 5px 50px 0 #4CAF50 inset,
              0 5px 50px 0 #4CAF50;
}

</style>