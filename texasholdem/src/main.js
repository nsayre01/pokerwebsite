import { addLocale } from 'core-js'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Game from './game.js'
//import userInput from 
//import { userInput } from './views/SelectionView.vue'


createApp(App).use(router).mount('#app')
const { rankBoard, rankDescription } = require('phe')
var Hand = require('pokersolver').Hand

const board = 'As Ks 4h Ad Kd'
const rank = rankBoard(board)
const name = rankDescription[rank]

console.log('%s is a %s', board, name)
var hand1 = Hand.solve(['Ad', 'As', '5h', '6h', '2d', 'Kc', 'Kh']);
var hand2 = Hand.solve(['Ad', 'As', '4c', 'Ks', '2d', 'Qs', 'Qd']);
var winner = Hand.winners([hand1,hand2]); // hand2
console.log(winner)

var hand = Hand.solve(['Ad', 'As', 'Jc', 'Th', '2d', 'Qs', 'Qd']);

console.log(hand.rank); // Two Pair
console.log(hand1.rank); // Two Pair, A's & Q's
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