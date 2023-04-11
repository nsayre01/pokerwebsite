//use the phe library
var phe = require('phe');

export function HandEval(cards) {
    //constructor
    this.cards = cards;

    const hand = this.cards;

    //get the rank of the hand
    const rank = phe.HandEval.evalHand(hand);
    
    return rank;
}