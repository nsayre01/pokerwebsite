//import userinput from the selectionview vue file
class Deck {
    constructor() {
        this.deck = [];
        this.reset();
        this.shuffle();

    }

    reset() {
        this.deck = [];
        const suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
        const values = [1,2,3,4,5,6,7,8,9,10,11,12,13];

        for (let suit in suits) {
            for (let value in values) {
                this.deck.push(values[value] + ' of ' + suits[suit]);
            }
        }
    }    

    shuffle() {
        const { deck } = this;
        let m = deck.length, i;

        while (m) {
            i = Math.floor(Math.random() * m--);

            [deck[m], deck[i]] = [deck[i], deck[m]];
        }

        return this;
    }

    deal() {
        return this.deck.pop();
    }

    isEmpty() {
        return this.deck.length === 0;
    }

    length() {
        return this.deck.length;
    }


}

class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }

    getCardValue() {
        return this.value;
    }

    getCardSuit() {
        return this.suit;
    }




}

class Player {

    constructor(name) {
        this.name = name;
        this.hand = [];
        this.currentBet = 0;
        this.money = 100;
        //this.actions = [];
        this.currentAction = '';
        this.score = 0;

    }

    getHand() {
        return this.hand;
    }

    getMoney() {
        return this.money;
    }

    getBet() {

        return this.currentBet;
    }

    // getActions() {
    //     return this.actions;
    // }

    setMoney(money) {

        this.money = money;
    }

    setBet(bet) {
        this.currentBet = bet;

    }

    // updateActions(action) {
    //     this.actions.push(action);
    //     this.currentAction = action;
    // }
   
    getAction() {
        return this.currentAction;
    }

    setAction(action) {
        this.currentAction = action;
    }


}


export default class Game {
    
    constructor() {
        this.deck = new Deck();
        this.board = [];
        this.players = [];
        this.round = 0;
        this.pot = 0;
        this.bet = 0;
        this.smallBlind = 2;
        this.bigBlind = 4;
        this.dealer = null;
        this.alivePlayers =[];
        this.actions = [];
        this.foldedPlayers = [];
    }
    
    //test user input passes from selectionview to game
    myFunction(userInput) {
        console.log(userInput);
    }
    addPlayer(name) {
        this.players.push(new Player(name));

    }

    dealCards() {
        for (let i = 0; i < 2; i++) {
            for (let player of this.players) {
                player.getHand().push(this.deck.deal());
            }
        }
    }
    setup() {

        this.deck.reset();
        this.deck.shuffle();
        //get player names for 3 players
        this.addPlayer(prompt('Player 1 name: '));
        this.addPlayer(prompt('Player 2 name: '));
        this.addPlayer(prompt('Player 3 name: ')); 
        this.dealCards();
        this.round = 0;
       
        //set dealer and blinds
        this.dealer = this.players[0];
        this.players[1].setMoney(this.players[1].getMoney() - this.smallBlind);
        this.players[1].setBet(this.smallBlind);
        this.players[2].setMoney(this.players[2].getMoney() - this.bigBlind);
        this.players[2].setBet(this.bigBlind);
        this.pot = this.smallBlind + this.bigBlind;
        this.bet = this.bigBlind;
        console.log("setup done")
        alert("Game started! Dealer is " + this.dealer.name + ". Small blind is " + this.players[1].name + " and big blind is " + this.players[2].name + ". Press OK to continue.");
        
        this.alivePlayers = this.players.slice();
    }
    printBoard() {
        alert("Board: " + this.board + "\n" + this.players[0].name + "'s hand: " + this.players[0].getHand() + "\n" + this.players[1].name + "'s hand: " + this.players[1].getHand() + "\n" + this.players[2].name + "'s hand: " + this.players[2].getHand());
        alert("Pot: " + this.pot + "\n" +"Bet: " + this.bet + "\n" + this.players[0].name + "'s money: " + this.players[0].getMoney() + "\n" + this.players[1].name + "'s money: " + this.players[1].getMoney() + "\n" + this.players[2].name + "'s money: " + this.players[2].getMoney());
    }
    preflop() {
        this.round = 1;
        console.log('preflop');
        this.printBoard();
        this.bettingRound(); 
        
        console.log('preflop done'); 

    }

    flop() {
        this.round = 2;
        console.log('flop');
        this.bet = 0;
        //deal 3 cards to the board
        for (let i = 0; i < 3; i++) {
            this.board.push(this.deck.deal());
        }
        this.printBoard();
        this.bettingRound();
        console.log('flop done');
    }

    turn() {
        this.round = 3;
        console.log('turn');
        this.bet = 0;

        //deal 1 card to the board
        this.board.push(this.deck.deal());
        this.printBoard();
        this.bettingRound();
        console.log('turn done');
    }

    river() {
        this.round = 4;
        console.log('river');
        this.bet = 0;
        //deal 1 card to the board
        this.board.push(this.deck.deal());
        this.printBoard();
        this.bettingRound();
        console.log('river done');
    }

    showdown() {
        this.round = 5;
        console.log('showdown');
        //showdown
        this.determineWinner();
        console.log('showdown done');

    }

    determineWinner() {
        for (let player of this.alivePlayers) {
            console.log(player.name + ' has ' + player.getHand());
            player.score = this.score(player.getHand());
        }
        console.log('The board is ' + this.board);
        //score each player's hand

    }
    score(hand){
        //hand + board
        let allCards = hand.concat(this.board);
        console.log('all cards: ' + allCards);
        //hand sorted by highest value
        let sortedHand = allCards.sort((a, b) => a.value - b.value);
        console.log('sorted hand: ' + sortedHand);
        //hand sorted by suit
        let sortedSuit = allCards.sort((a, b) => a.suit - b.suit);
        console.log('sorted suit: ' + sortedSuit);
        //evaluate hand for 5 card poker hands 
        //royal flush
        
    }
    bettingRound() {
        //go until all 3 players have called or folded
        // console.log('alive players: ' + this.alivePlayers)
        // console.log('alive players length: ' + this.alivePlayers.length)
        while (this.alivePlayers.length > 1 ) {
            for (let player of this.players) {
                //if player is alive
                if (this.alivePlayers.includes(player)) {

                    console.log('prompting player: ' + player.name + '')
                //ignore players who have folded
                    this.promptPlayer(player);
                }
            }
            if (this.alivePlayers.every(p => p.getBet() === this.bet)) {
                break;
            }
        }
    }

    promptPlayer(player) {
        let action = prompt('The table shows ' + this.board + '.\n' + 'The pot is ' + this.pot + '.\n' + 'The current bet is ' + this.bet + '.\n' +'Your current bet is ' + player.getBet() + '.\n' +'Your current hand is ' + player.getHand() + '.' + player.name + ' what would you like to do?');
        
        if (action === 'fold') {
            this.fold(player);
        } else if (action === 'call') {
            this.call(player);
        } else if (action === 'raise') {
            this.raise(player);
        } else if (action === 'check') {
            this.check(player);
        } else if (action == 'bet') {
            this.bet(player);
        } else {
            alert('Invalid action');
            this.promptPlayer(player);
        }
        player.setAction(action);
    }
    bet(player) {
        //check no previous bet
        if (this.bet > 0) {
            alert('There is already a bet. You must call, raise, or fold.');
            this.promptPlayer(player);
            return;
        }
        
        //can only bet 4 for rounds 1 and 2 and 8 for rounds 3 and 4
        if(this.round === 1 || this.round === 2) {
            this.bet = 4;
        }
        if(this.round === 3 || this.round === 4) {
            this.bet = 8;
        }

        //check if player has enough money to bet
        if (player.getMoney() < this.bet) {
            alert('You do not have enough money to bet');
            this.bet = 0;
            this.promptPlayer(player);
            return;
        }
        player.setMoney(player.getMoney() - this.bet);
        player.setBet(this.bet);
        this.pot += this.bet;
        this.actions.push('bet');


    
    }

    fold(player) {
        player.setMoney(0);
        //remove player from alivePlayers
        
        const index = this.alivePlayers.indexOf(player);
        console.log('index: ' + index);
        this.alivePlayers.splice(index, 1); // 2nd parameter means remove one item only
        console.log(this.alivePlayers[0].name);
        this.foldedPlayers.push(player);
        //console.log(this.alivePlayers);
        this.actions.push('fold');
        
    }



    call(player) {
        //check theres a bet
        if (this.bet === 0) {
            alert('There is no bet to call');
            this.promptPlayer(player);
            return;
        }

        //check if player has enough money to call
        if (player.getMoney() < this.bet) {
            //check if player has 0 money
            if (player.getMoney() === 0) {
                console.log('You have no money left');
                this.fold(player);
                this.alivePlayers.remove(player);
                return;
            }
            console.log('You do not have enough money to call');
            this.promptPlayer(player);
        }
        //if player has same bet as current bet, change to check
        if (player.getBet() === this.bet) {
            console.log('You can check instead of calling')
            this.check(player);
            return;
        }
        player.setMoney(player.getMoney() - (this.bet-player.getBet()));
        //add to pot
        this.pot += (this.bet-player.getBet());
        //set player bet to current bet
        player.setBet(this.bet);
        this.actions.push('call');
           
        
    }

    raise(player) {
        //check theres a bet
        if (this.bet === 0) {
            alert('There is no bet to raise');
            this.promptPlayer(player);
            return;
        }
        //raise amt has to 4 for rounds 1 and 2, 8 for rounds 3 and 4
        let raiseAmt = 0;
        if (this.round === 1 || this.round === 2) {
            raiseAmt = 4;
        } else {
            raiseAmt = 8;
        }
        //check if player has enough money to raise
        if (player.getMoney() < raiseAmt) {
            //check if player has 0 money
            if (player.getMoney() === 0) {
                console.log('You have no money left');
                this.fold(player);
                this.alivePlayers.remove(player);
                return;
            }
            console.log('You do not have enough money to raise');
            this.promptPlayer(player);
        }
        player.setMoney(player.getMoney() - (player.getBet() + raiseAmt));
        player.setBet(player.getBet() + raiseAmt);
        this.pot += raiseAmt;
        this.bet += raiseAmt;
        this.actions.push('raise');

    }  

    check(player) {
        //players can only check if current bet - bet is 0
        if (this.bet - player.getBet() !== 0) {
            console.log('You cannot check');
            this.promptPlayer(player);
        }
        this.actions.push('check');

    }


  
}
