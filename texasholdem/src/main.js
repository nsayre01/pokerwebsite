import { addLocale } from 'core-js'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Game from './game.js'
//import userInput from 
//import { userInput } from './views/SelectionView.vue'


createApp(App).use(router).mount('#app')
//test Game is working 
/*
let game = new Game();
game.setup();
game.preflop();
game.flop();
game.turn();
game.river();
game.showdown();
*/ 