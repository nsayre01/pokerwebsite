from Model import DeepCFRModel 
import numpy as np 
from random import choices
import random
from torch import optim
from player import Player
import torch
from pokerface import *
import copy 
import pathlib
BET_PADDING = 1000
CARD_TYPES = 2
NACTIONS = 3 

def parse_gamestate(game_state):
    card_to_label = cards_to_num_dic_init(StandardDeck())
    hand =  process_card_labels(game_state["ai_hand"],card_to_label)
    board =  process_card_labels(game_state["board"],card_to_label)
    history = game_state["history"]
    actions = game_state["actions"]
    if len(board) == 3:
        flop = board
        bet_history = history_to_bet(history)
        return ( torch.tensor([hand]),torch.tensor([flop]), []) , torch.tensor([bet_history]),actions    
    elif len(board) == 4:
        flop = board[:3]
        turn = board[3]
        bet_history = history_to_bet(history)
        return ( torch.tensor([hand]),torch.tensor([flop]), [torch.tensor([turn])]) , torch.tensor([bet_history]), actions 
    elif len(board) == 5:
        flop = board[:3]
        turn = board[3]
        river = board[4]
        bet_history = history_to_bet(history)
        return ( torch.tensor([hand]),torch.tensor([flop]), [torch.tensor([turn]), torch.tensor([river])]) , torch.tensor([bet_history]),actions 
def model_nextmove(game__state):
    cards,bet_history,actions = parse_gamestate(game__state) 

    strat_model = DeepCFRModel(CARD_TYPES,BET_PADDING,NACTIONS)
    if pathlib.Path("Poker_strategy_Model.pt").exists():
        checkpoint = torch.load("Poker_strategy_Model.pt")
        strat_model.load_state_dict(checkpoint['model_state_dict'])
        strat_model.eval()
    strat  = strat_model.forward(cards,bet_history)
    print(strat[0].tolist())
    list_strat = strat[0].tolist()
    return choices(actions,list_strat[len(list_strat)-len(actions):])[0]
    
def cards_to_num_dic_init(deck):
        counter = 0
        card_to_num_dic = {}
        deck1= list(deck)
        deck1.sort()
        for i in deck1:
            card_to_num_dic[i] = counter
            counter +=1
        return card_to_num_dic

        
def process_card_labels(cards,card_to_label):
    card_labels = []
    
    for i in cards:
        
        card_labels.append(card_to_label[parse_card(i)])
    return card_labels
def history_to_bet( h):
    bets = []
    for i in h:
        if i == "bet":
            bets.append(1)
        else:
            bets.append(0)

    return bet_padding(bets)
def bet_padding(bets:list):
        padding = [0 for i in range(BET_PADDING - len(bets))]
        bets.extend(padding)
        return bets


# game_actions = {

# "ai_hand": ["5h", "7s"],
# "board": ["Jd", "Td", "Ad", "5h", "6c"],
# "history": ["bet", "call", "call", "bet", "bet", "bet", "call", "bet", "call", "fold", "bet"],
# "actions": ["call", "fold"]
# }

# print(model_nextmove(game_actions))

