"""App.py reads in endpoints and does specified actions based on form informaiton"""
import math
from flask import Flask, request
import UseModel 
import winnerEval
#Error above will vanish when frontend combines with backend, and Math might be used, review later
#if math is actually needed
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route("/AI-Turn", methods=['GET'])
def get_AI_move():
    game_state = request.get_json(force=True)
    return UseModel.model_nextmove(dict(game_state))

@app.route("/Get-Winner", methods=['GET'])
def get_winner_move():
    game_state = request.get_json(force=True)
    return str(winnerEval.get_winner(dict(game_state)))
