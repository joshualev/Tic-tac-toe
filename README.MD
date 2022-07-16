# About the application
This application is a simple recreation of the popular Tic-Tac-Toe game.

This was my first solo project completed in week 3 of General Assembly's Software Engineering Immersive 12 week bootcamp. It cann be accessed via this link: https://joshualev.github.io/

## This application was built with
1. `HTML`
2. `CSS`
3. `Javascript`

# Instructions and game dynamics
- Players take turns to place their symbol ("X" or "O") in a 3 x 3 grid. 
- If a player places three of their symbols in a straight line, this player wins.
- The winning player gains a point.

## Playing the AI
You can select an AI player and choose which peice they play as. 
- Note that player "X" will always go first in this design iteration of the game.


## Basic Functionality
1. `Keep track of who the current player is`
    - After each move the player turn will be changed using a ternary operator.
2. `Keep track of if the game is over and who won.`
    - After every move, the game will check for a winner by looping over the current board state and comparing this to our winning combinations array.

    - If a sequence of 'winning tiles' are occupied with the same player symbol, the game ends, and that player wins a point.

    - If all tiles are occupied by a player, and there is no winning combination, then the round ends in a draw and the game ends and no points are gained for either player.
    

## Other Features
1. `Basic AI implementation works by randomly selecting tile on the board.`
 - this tile placement is only made if it passes basic game parameters.

2. `Reset functionality is called when the respective button is clicked.`
- scores are refreshed by selecting the "refresh" button in the scoreboard

3. `All game parameters are reset if:`
- Scores are reset.
- If an AI player is selected
- If the 'replay' or 'reset' button is clicked.


# Planned future improvements

## UI/UX
- Ability to customize skins such as light-mode
- Ability to choose from a selection of player icons
- Tweak timing and animations to further improve the 'flow' of the game

## Game features
- Ability to play other people online who are using different computers
- AI difficulty mode selection (easy, hard, impossible) 
 > To acheieve impossible mode, I would like to integrate game theory by implementing a 'minimax' decision rule.

