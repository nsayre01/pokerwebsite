//import userinput from the selectionview vue file
class Deck {
    constructor() {
        this.deck = [];
        this.reset();
        this.shuffle();

    }

    reset() {
        this.deck = [];
        const suits = ['❤', '♦', '♣', '♠'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                this.deck.push({ suit: suits[i], rank: ranks[j] });
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
        this.pastActions = [];
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

     updateAction(action) {
         this.pastActions.push(action);
         this.currentAction = action;
     }
   
    getAction() {
        return this.currentAction;
    }

    setAction(action) {
        this.currentAction = action;
    }


}



    

        var deck = new Deck();
        var board = [];
        var players = [];
        var round = 0;
        var pot = 0;
        var bet;
        var smallBlind = 2;
        var bigBlind = 4;
        var dealer = null;
        var alivePlayers =[];
        var foldedPlayers = [];
        var text = "";
        var current_bettor_index = 0;
        var actions = [];
        var data = {
            "players": [],
            "ai_hand": [],
            "board": [],
            "history": actions,
            "actions": []
            
        }
        var running = 0;
    
    
    function getBoard() {
        return this.board;
    }
    function addPlayer(name) {
        this.players.push(new Player(name));

    }
    function getPlayers() {
        return this.players;
    }

    function dealCards() {
        for (let i = 0; i < 2; i++) {
            for (let player of this.players) {
                player.getHand().push(this.deck.deal());
                gui_deal_player();
            }
        }
    }
    function convert_card(card) {
        var cardvalue = "";
        
        if(card.rank == '10') cardvalue += "T";
        else cardvalue += card.rank;
        if (card.suit == '❤') cardvalue += "h";
        if (card.suit == '♦') cardvalue += "d";
        if (card.suit == '♣') cardvalue += "c";
        if (card.suit == '♠') cardvalue += "s";
        console.log(cardvalue)
        
    }

    function setup() {

        this.deck.reset();
        this.deck.shuffle();
        //get player names for 3 players
        this.addPlayer(localStorage.getItem("oneName"));
        this.addPlayer(localStorage.getItem("twoName"));
        this.addPlayer("Bot"); 
        this.dealCards();
        this.round = 0;
       
        //set dealer and blinds
        this.dealer = this.players[0];
        this.players[1].setMoney(localStorage.getItem("TwoBuyin") - this.smallBlind);
        this.players[1].setBet(this.smallBlind);
        this.players[2].setMoney(1000 - this.bigBlind);
        this.players[2].setBet(this.bigBlind);
        this.pot = this.smallBlind + this.bigBlind;
        bet = this.bigBlind;
        console.log(this.bet);
        console.log("setup done")
        gui_update_text("Game started! Dealer is " + this.dealer.name + ". Small blind is " + this.players[1].name + " and big blind is " + this.players[2].name );
        
        this.alivePlayers = this.players.slice();
        //flop();
        mainGame();
    }
    function printBoard() {
        //this.text = "Board: " + this.board + "\n" + this.players[0].name + "'s hand: " + this.players[0].getHand() + "\n" + this.players[1].name + "'s hand: " + this.players[1].getHand() + "\n" + this.players[2].name + "'s hand: " + this.players[2].getHand() + "\n" +"Pot: " + this.pot + "\n" +"Bet: " + this.bet + "\n" + this.players[0].name + "'s money: " + this.players[0].getMoney() + "\n" + this.players[1].name + "'s money: " + this.players[1].getMoney() + "\n" + this.players[2].name + "'s money: " + this.players[2].getMoney();
    }
    function preflop() {
        this.round = 1;
        console.log('preflop');
        this.printBoard();
        //this.bettingRound(); 
        
        console.log('preflop done'); 

    }

    function flop() {
        var time = 0
        this.round = 2;
        console.log('flop');
        this.bet = 0;
        //deal 3 cards to the board
        for (let i = 0; i < 3; i++) {
            this.board.push(this.deck.deal());
            setTimeout("gui_lay_table_card(" +i+")", (time + 100 * (i+1)))
        }
        
        this.printBoard();
        //this.bettingRound();
        console.log('flop done');
    }

    function turn() {
        this.round = 3;
        console.log('turn');
        this.bet = 0;

        //deal 1 card to the board
        this.board.push(this.deck.deal());
        this.printBoard();
        this.bettingRound();
        console.log('turn done');
    }

    function river() {
        this.round = 4;
        console.log('river');
        this.bet = 0;
        //deal 1 card to the board
        this.board.push(this.deck.deal());
        this.printBoard();
        this.bettingRound();
        console.log('river done');
    }

    function showdown() {
        this.round = 5;
        console.log('showdown');
        //showdown
        this.determineWinner();
        console.log('showdown done');

    }

    function mainGame() {
        var up_index = 0;
        if (players[current_bettor_index].getAction() == 'fold') {
            up_index = 1;
        }
        else if (players[current_bettor_index].getAction() == 'option' || players[current_bettor_index].getAction() == '') {
            console.log("prompting " + players[current_bettor_index].name)
            //check if current bettor is bot
            if(current_bettor_index == 2) {
                bot_answer();
            }
            else{
                var call_button_text = "Call";
                var fold_button_text = "Fold";
                var bet_button_text  = "Raise";
        
                var to_call = bet - players[current_bettor_index].currentBet
                console.log(bet)
                console.log(players[current_bettor_index].currentBet)
                if (to_call > players[current_bettor_index].money)
                to_call = players[current_bettor_index].money;
                if (to_call == 0) {
                    call_button_text = "Check";
                    fold_button_text = "";
                    bet_button_text  = "Bet";
                }
                
            if(call_button_text == "Raise") gui_setup_buttons(fold_button_text, call_button_text, bet_button_text, fold, call, raise)
            else gui_setup_buttons(fold_button_text, call_button_text, bet_button_text, fold, call, bet)
                var player = players[current_bettor_index]
                gui_update_text( "The table shows " + this.board + "\n" + "The pot is " + this.pot + "\n" + "The current bet is " + this.bet + "\n" + "Your current bet is " + player.getBet() + "\n" +"Your current hand is " + player.getHand() + "." + player.name + " what would you like to do?")
                
            }
        }
        var can_break = true;
        for (var j = 0; j < players.length; j++) {
            var s = players[j].currentAction;
            if (s == "choose" || s == "") {
                can_break = false;
                break;
            }
            if (s != "fold") {
                if (players[j].currentBet < bet) {
                    can_break = false;
                    break;
                }
            }
        }
      if (up_index)
        current_bettor_index = get_position(current_bettor_index, 1);
      if (can_break) {
          console.log("ready to move on")
        setTimeout("ready_to_move()", 999 );
      }
      else{
          console.log("recalling main")
        setTimeout("mainGame()", 999 );
      }

    }
    
    function ready_to_move() {
        var alive = getAlive();
        
        //check end of game
        if(board[4]) {
            showdown();
        }
        clear_bets();
        reset_players();
        
//        if (players[button_index].status == "fold") players[get_next_player_position(button_index, -1)].status = "choose";
//        else players[button_index].status = "choose";
        current_bettor_index = get_position(0, 1);
        var show_cards = 0;
        if (alive < 2)
            show_cards = 1;
        
//        if (!running)
//            for (var i = 0; i < players.length; i++)
//               // if (players[i].currentAction != "fold" ) 

        if (alive < 2)running= 1;
        if (!board[0]) flop();
        //else if (!board[3]) turn();
        //else if (!board[4]) river();
        
    }
    function determineWinner() {
        for (let player of this.alivePlayers) {
            console.log(player.name + ' has ' + player.getHand());
            player.score = this.score(player.getHand());
        }
        console.log('The board is ' + this.board);
        //score each player's hand

    }
    function score(hand){
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
    async function bettingRound() {
        //go until all 3 players have called or folded
        // console.log('alive players: ' + this.alivePlayers)
        // console.log('alive players length: ' + this.alivePlayers.length)
        while (this.alivePlayers.length > 1 ) {
            for (let player of this.players) {
                //if player is alive
                if (this.alivePlayers.includes(player)) {

                    console.log('prompting player: ' + player.name + '')
                //ignore players who have folded
                   await this.promptPlayer(player);
                }
            }
            if (this.alivePlayers.every(p => p.getBet() === this.bet)) {
                break;
            }
        }
    }
    function getAlive() {
        var n = 0;
        for (var i = 0; i < players.length; i++)
        if (players[i].currentAction != "fold" && players[i].money > 0) {
            n++;
        }    
        return n;
    }
    function promptPlayer(player) {
        
       gui_update_text( "The table shows " + this.board + "\n" + "The pot is " + this.pot + "\n" + "The current bet is " + this.bet + "\n" + "Your current bet is " + player.getBet() + "\n" +"Your current hand is " + player.getHand() + "." + player.name + " what would you like to do?")
        
    
//       let action = 'bet'
//        
//       if (action === 'fold') {
//           this.fold(player);
//       } else if (action === 'call') {
//           this.call(player);
//       } else if (action === 'raise') {
//           this.raise(player);
//       } else if (action === 'check') {
//           this.check(player);
//       } else if (action == 'bet') {
//           this.bet(player);
//       } else {
//           this.text = ('Invalid action');
//           this.promptPlayer(player);
//       }
       //player.setAction(action);
    }
    function bot_answer() {
        //connect to bot
        call()
        return;
    }
    function bet() {
        var player = players[current_bettor_index]
        //check no previous bet
        if (this.bet > 0) {
            this.text = 'There is already a bet. You must call, raise, or fold.';
            //this.promptPlayer(player);
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
            this.text = ('You do not have enough money to bet');
            this.bet = 0;
            this.promptPlayer(player);
            return;
        }
        player.setMoney(player.getMoney() - this.bet);
        player.setBet(this.bet);
        this.pot += this.bet;
        actions.push('bet');
        player.updateAction('bet')
        current_bettor_index = get_position(current_bettor_index,1);


    
    }
    function clear_bets() {
        for (var i = 0; i < players.length; i++) players[i].bet = 0;
        bet = 0;
    }

    function reset_players() {
        for (var i = 0; i < players.length; i++) {
            if (players[i].currentAction = "fold") {
                players[i].currentAction = "";
            }
        }
    }

    function fold(){
        var player = players[current_bettor_index]
        player.setMoney(0);
        //remove player from alivePlayers
        
        const index = this.alivePlayers.indexOf(player);
        console.log('index: ' + index);
        this.alivePlayers.splice(index, 1); // 2nd parameter means remove one item only
        console.log(this.alivePlayers[0].name);
        this.foldedPlayers.push(player);
        //console.log(this.alivePlayers);
        actions.push('fold');
        player.updateAction('fold')
        current_bettor_index = get_position(current_bettor_index,1);
        gui_update_text(player.name + "folded.")
    }



    function call() {
        //check theres a bet
        var player = players[current_bettor_index]
        console.log(player)
        if (this.bet - player.getBet() == 0) {
          
        
            actions.push('check');
            player.updateAction('check')
            gui_update_text(player.name + "checked.")
            current_bettor_index = get_position(current_bettor_index,1);
            return;
            //check instead
//            gui_update_text('There is no bet to call'); //to do make a popup?
//            setTimeout(function() {this.promptPlayer(player)}, 100);
//            return;
        }

        //check if player has enough money to call
        if (player.getMoney() < this.bet) {
            //check if player has 0 money
            if (player.getMoney() === 0) {
                gui_update_text('You have no money left');
                this.fold(player);
                this.alivePlayers.remove(player);
                return;
            }
            gui_update_text('You do not have enough money to call');
            this.promptPlayer(player);
        }
        //if player has same bet as current bet, change to check
//        if (player.getBet() === this.bet) {
//            gui_update_text('You can check instead of calling')
//            this.check(player);
//            return;
        
        player.setMoney(player.getMoney() - (this.bet-player.getBet()));
        //add to pot
        this.pot += (this.bet-player.getBet());
        //set player bet to current bet
        player.setBet(this.bet);
        actions.push('call');
        player.updateAction('call')
        gui_update_text(player.name + "called.")
        current_bettor_index = get_position(current_bettor_index,1);
           
        
    }

    function raise() {
        var player = players[current_bettor_index]
        //check theres a bet
        if (this.bet === 0) {
            this.text = ('There is no bet to raise');
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
                this.text = ('You have no money left');
                this.fold(player);
                this.alivePlayers.remove(player);
                return;
            }
            this.text = ('You do not have enough money to raise');
            this.promptPlayer(player);
        }
        player.setMoney(player.getMoney() - (player.getBet() + raiseAmt));
        player.setBet(player.getBet() + raiseAmt);
        this.pot += raiseAmt;
        this.bet += raiseAmt;
        actions.push('raise');
        player.updateAction('raise')
        gui_update_text(player.name + "raised.")
        current_bettor_index = get_position(current_bettor_index,1);

    }  

    function check() {
        var player = players[current_bettor_index]
        //players can only check if current bet - bet is 0
        if (this.bet - player.getBet() !== 0) {
            console.log('You cannot check');
            this.promptPlayer(player);
        }
        actions.push('check');
        player.updateAction('check')
        gui_update_text(player.name + "checked.")
        current_bettor_index = get_position(current_bettor_index,1);

    }

//GUI
    
    function gui_lay_table_card(n) {
        var suitid = "flop" + n + "-suit";
        var suitdiv = document.getElementById(suitid);
        suitdiv.innerHTML=board[n].suit;
        
        var rankid = "flop" + n + "-rank1";
        var rankdiv = document.getElementById(rankid);
        rankdiv.innerHTML=board[n].rank;
        
        var rankid1 = "flop" + n + "-rank2";
        var rankdiv1 = document.getElementById(rankid1);
        rankdiv1.innerHTML=board[n].rank;
        
        var maindiv = document.getElementById("flop" + n)
        maindiv.style.visibility = 'visible';
    }
  
    function init() {
        console.log("HELLO")
        setup()
    }
    
    function gui_update_text(text) {
        var div = document.getElementById('message');
        div.innerHTML = text;
}
    
    function gui_deal_player(index) {
        
    }
    
    function gui_hide_cards(index) {
        
    }
    
    function get_position(i, delta) {
      var j = 0,
        step = 1;
      if (delta < 0) step = -1;
      while (1) {
        i += step;
        if (i >= players.length) i = 0;
        else if (i < 0) i = players.length - 1;
        if (players[i].getAction() == 'fold' || ++j < delta) {} else break;
      }
        return i;
    }
    function update_button (button, button_text, func_on_click) {
        if (button_text == 0) {
            button.style.visibility = 'hidden';
            //button.disabled = true;
        } 
        else {
            button.style.visibility = 'visible';
            button.innerHTML = button_text;
            button.onclick = func_on_click;
        }
    }
    
    function gui_setup_buttons(show_fold, call_text, raise_text, fold_func, call_func, raise_func) {
      var buttons = document.getElementById('actionss' + current_bettor_index );
      var fold = buttons.children['fold'];
      update_button(fold, show_fold, fold_func);

      var call = buttons.children['call'];
      update_button(call, call_text, call_func);

      var raise = buttons.children['raise'];
      update_button(raise, raise_text, raise_func);
    }
    




