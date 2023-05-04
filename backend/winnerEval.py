from pokerface import * 
from player import Player
def parse_game_state_win(game_state):
    players = []
    board = []
    for i in list(game_state["players"]):
        hole = []
        for j in i["cards"]:
            hole.append(parse_card(j))
        players.append(Player(i["id"],hole))
    for j in list(game_state["board"]):
          board.append(parse_card(j))
    return players,board
    


def  get_winner(game_state):
    players,board = parse_game_state_win(game_state)
    evaluator = StandardEvaluator()
    players.sort(key=lambda x:  evaluator.evaluate_hand(
                x.get_cards(), board,
                ), reverse=True)
    return players[0].ID()

game_actions = {
"players" : [{"id": 3, "cards": ["Kh","Qh"]}, 
             {"id": 2, "cards": ["5h","7s"]},
             {"id": 1, "cards": ["7h","6h"]} ],
"ai_hand": ["5h", "7s"],
"board": ['Jc','3d','5c',
          '4h','Jh'],
"history": ["bet", "call", "call", "bet", "bet", "bet", "call", "bet", "call", "fold", "bet"],
"actions": ["call", "fold"]
}

print(get_winner(game_actions))