// RETREIVE HTML ELEMENTS
/////////////////////////////////////////////////////////
//////////////ALL 9 TILES ON BOARD SELECTED//////////////
const tiles = document.querySelectorAll('.tile');

/////////////////////////////////////////////////////////
///////////////GAME OVER SCREEN COMPONENTS///////////////
const gameOverArea = document.querySelector('#game-over-area')  
const gameOverText = document.querySelector('.gameOverText')   
const playAgain = document.querySelector('.playAgain')    

/////////////////////////////////////////////////////////
/////////////BUTTON + INTERACTIVE COMPONENTS/////////////
const restartBtn = document.querySelector('#restartBtn')         
const playerTurnMsg = document.querySelector('#playerTurnMsg') 
const gameMessage = document.querySelector('#game-message')
const refreshScoreBtn = document.querySelector('.refreshScoreBtn') 
const aiToggleBtn = document.querySelector('#aiButton')
const aiXclass = document.querySelector('#aiXclass')
const aiOclass = document.querySelector('#aiOclass')

/////////////////////////////////////////////////////////
////////////////////CREATE PLAYER OBJECTS////////////////
const playerX = {
    aiPlayer: false,
    symbol: "X",
    playerName: "PLAYER X",
    score: 0,
    scoreDisplay: document.querySelector('#playerXscore'),
}

const playerO = {
    aiPlayer: false,
    symbol: "O",
    playerName: "PLAYER O",
    score: 0,
    scoreDisplay: document.querySelector('#playerOscore'), 
}

let playerTurn = playerX;

///////////////////////////////////////////////////////////
///////////BOARD STATE AND WINNING COMBINATIONS///////////
const boardState = ["","","","","","","","",""]
const winningConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

///////////////////////////////////////////////////////////
/////SELECT AI AS PLAYER ON CLICK (RESPECTIVE BUTTONS)/////
  aiXclass.addEventListener('click', playerXasAI)
  aiOclass.addEventListener('click', playerOasAI)

///////////////////////////////////////////////////////////
////////////LISTEN FOR CLICK ON RESET BUTTON//////////////
refreshScoreKeeper()/////////////////////////////////////
function refreshScoreKeeper() {
    refreshScoreBtn.addEventListener('click',refreshScores)
}

///////////////////////////////////////////////////////////
/////////LISTEN FOR CLICK ON RESET/RESTART BUTTON/////////
resetButton()////////////////////////////////////////////
function resetButton() {
playAgain.addEventListener('click',resetGameFunction)
restartBtn.addEventListener('click',resetGameFunction)
}

///////////////////////////////////////////////////////////
////////////LISTEN FOR CLICK ON ALL TILES/////////////////
onclick()////////////////////////////////////////////////
function onclick() {
    tiles.forEach((tile) => {
        tile.addEventListener('click',handleTileClick)
    })
}

/////////////////////////////////////////////////////////
///////////EXECUTE OUR FUNCTION ON CELL CLICKS//////////
///////////////////////////////////////////////////////
function handleTileClick(event){
    const tile = event.target
    const tileIndex = tile.dataset.index
    if (gameOverArea.classList.contains('hidden'))
    if (boardState[tileIndex - 1] === ""){
        if (playerTurn === playerX && playerX.aiPlayer === false) {
            makeMove(tile,tileIndex)
            gameStatus()
            if (playerO.aiPlayer === false){
                playerTurnMsg.innerText = "IT IS PLAYER O'S MOVE..."
                playerTurnMsg.className = "playerMoveVisible"
            } else if (playerO.aiPlayer) {
                playerTurnMsg.innerText = "COMPUTER IS THINKING..."
                playerTurnMsg.className = "computerMoveVisible"
            }
        } 
        else if (playerTurn === playerO && playerO.aiPlayer === false) {
            makeMove(tile,tileIndex)
            gameStatus()
            {
            if (playerX.aiPlayer === false){
                playerTurnMsg.innerText = "IT IS PLAYER X'S MOVE..."
                playerTurnMsg.className = "playerMoveVisible"
            } else if (playerX.aiPlayer) {
                playerTurnMsg.innerText = "COMPUTER IS THINKING..."
                playerTurnMsg.className = "computerMoveVisible"
                }
            } 
        }
        } 
        else {
            inGameMessage("TILE IS OCCUPIED")
        }
        checkWinner()
        setTimeout(makeMoveAI,randomSeconds())
}

///////////////////////////////////////////////////////////
///////////////CHANGE PLAYER TURN, ADD POINT//////////////
/////////////////////////////////////////////////////////
function makeMove (tile,tileIndex) {
    if (playerTurn.aiPlayer === false){
        tile.innerText = playerTurn.symbol
        boardState[tileIndex - 1] = playerTurn.symbol
        playerTurn = playerTurn === playerO ? playerX : playerO //Ternary Operator
    }
}

///////////////////////////////////////////////////////////
///// AI EXECUTES RANDOM MOVE WITH VALID PARAMETERS //////
/////////////////////////////////////////////////////////
function makeMoveAI(){
    if (gameOverArea.classList.contains('hidden'))
    if (playerTurn.aiPlayer === true){
        for (let i = 1; i < 10; i++){
            const random = Math.floor(Math.random() * 10)
            if (boardState[random -1] === ""){
                boardState[random -1] = playerTurn.symbol
                tiles[random -1].innerText = playerTurn.symbol
                checkWinner()
                playerTurn = playerTurn === playerO ? playerX : playerO
                playerTurnMsg.className = "playerMoveVisible"
                playerTurnMsg.innerText = "IT'S YOUR TURN"
                return
        }  
        }
    } 
}

///////////////////////////////////////////////////////////
////////////////CHECK FOR WINNING CONDITION///////////////
/////////////////////////////////////////////////////////
function checkWinner() {
for (const winningCondition of winningConditions){
    const tile1 = winningCondition[0] - 1;
    const tile2 = winningCondition[1] - 1;
    const tile3 = winningCondition[2] - 1;
    //IF A WINNING COMBINATION OF TILES ARE OCCUPIED, AND EACH TILES VALUE IS EQUAL, THERE IS A WINNER
    if (boardState[tile1] != "" 
        && boardState[tile1] === boardState[tile2]
        && boardState[tile2] === boardState[tile3]){
        if (boardState[tile1] === "O") {
            winGameAnimation(tile1,tile2,tile3)
            gameOverScreen("WINNER IS O")
            addPointAnimation(playerO)
            setTimeout(removePointAnimationO,1000);
            playerTurnMsg.className = 'playerMoveHidden'
            return
        } 
        else if (boardState[tile1] === "X"){
            addPointAnimation(playerX)
            setTimeout(removePointAnimationX,1000);
            winGameAnimation(tile1,tile2,tile3)
            gameOverScreen("WINNER IS X")
            playerTurnMsg.className = 'playerMoveHidden'
            return
        } 
        }
        }
        //CHECK FOR DRAW//
        const checkBoardState = boardState.every((boardStateArray) => boardStateArray !== "")
        if (checkBoardState) {
            gameOverScreen("IT IS A DRAW")
            playerTurnMsg.className = 'playerMoveHidden'
            return
    } 
}
///////////////////////////////////////////////////////////
////////////CHECKS FOR IF GAME SHOULD CONTINUE////////////
function gameStatus() {
    const checkBoardState = boardState.every((boardStateArray) => boardStateArray !== "")
    if (checkBoardState === true) {
        checkWinner()
    }
}

///////////////////////////////////////////////////////////
///////////////RESET GAME PARAMETERS//////////////////////
function gameOverScreen(message) {
    setTimeout(aiOclass.classList.remove('selected'),2000)
    setTimeout(aiXclass.classList.remove('selected'),2000)
    restartBtn.className = "restartGameHidden"
    playerTurnMsg.className = 'playerMoveHidden'
    gameOverArea.className = 'visible'
    gameOverText.innerText = message
        tiles.forEach((tile) => {    
        tile.removeEventListener('click',handleTileClick)
        })
}

///////////////////////////////////////////////////////////
///////////////WINNING NUMBERS LIGHT UP///////////////////
function winGameAnimation(index1,index2,index3){
    tiles[index1].className = 'tileWinningCombo'
    tiles[index2].className = 'tileWinningCombo'
    tiles[index3].className = 'tileWinningCombo'
}

///////////////////////////////////////////////////////////
///////////////RESET GAME PARAMETERS//////////////////////
function resetGameFunction() {
    boardState.fill("")
    tiles.forEach((tile) => {
        tile.innerText = ""
    })
    tiles.forEach((tile) => {
        tile.className = "tile"
    })
    gameOverArea.className = "hidden"
    playerTurnMsg.className = "playerMoveHidden"
    restartBtn.className = "restartGameVisible"
    playerTurn = playerX;
    playerO.aiPlayer = false
    playerX.aiPlayer = false
    boardResetAnimation()
    setTimeout(removeResetBoardAnimation,2000);
    onclick()
}

///////////////////////////////////////////////////////////
////////////////REFRESH SCORE COUNTER/////////////////////
function refreshScores(){
    playerX.score = 0
    playerO.score = 0
    playerX.scoreDisplay.innerText = playerX.score
    playerO.scoreDisplay.innerText = playerO.score
    playerX.scoreDisplay.className = "resetPointAnimation"
    playerO.scoreDisplay.className = "resetPointAnimation"
    setTimeout(removePointAnimationO,1000);
    setTimeout(removePointAnimationX,1000);
    resetGameFunction()
}

///////////////////////////////////////////////////////////
////////////////TILE OCCUPIED MESSAGE/////////////////////
function inGameMessage(message){
    gameMessage.className = "gameMessageVisible"
    gameMessage.innerText = message
    setTimeout(fadeMessageTimer,2000)
    setTimeout(hideMessageTimer,3000)
}
function fadeMessageTimer() {
    gameMessage.className = "fadeAnimation"
}
function hideMessageTimer() {
    gameMessage.className = "gameMessageHidden"
}
//********************************************************//
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
////////////////ADD POINT ANIMATION EFFECT/////////////////
function addPointAnimation(player) {
    player.scoreDisplay.className = "winPoint"
    player.score +=1
    player.scoreDisplay.innerText = player.score
}
function removePointAnimationX(){
    playerX.scoreDisplay.className = "playerxScoreDisplay"
}
function removePointAnimationO(){
    playerO.scoreDisplay.className = "playeroScoreDisplay"
}
//********************************************************//
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
/////////////BOARD RESET ANIMATION EFFECT/////////////////
function boardResetAnimation(){
    const boardContainer = document.querySelector("#board-container")
    boardContainer.className = "boardContainerAnimation"
}
function removeResetBoardAnimation(){
    const boardContainer = document.querySelector("#board-container")
    boardContainer.className = "boardContainer"
}
//********************************************************//
///////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////
/////////////         AI FUNCTIONS          //////////////
/////////////////////////////////////////////////////////
/////////////AI RANDOM MOVE IN SECONDS TIMER////////////
function randomSeconds(){
        const randomNumber = Math.floor(Math.random() * 2 + 1)
        return randomNumber * 1000
}
//////SELECTS PLAYERX AS I FOR CALLBACK/////
function playerXasAI() {
    playerTurnMsg.className = "playerMoveHidden"
    aiXclass.className = 'selected'
    aiOclass.classList.remove('selected')
    resetGameFunction()
    playerX.aiPlayer = true
    playerO.aiPlayer = false
    setTimeout(aiTurnMsgTimer,2000)
    setTimeout(makeMoveAI,4000)
    // setTimeout(resetGameFunction,300)
    // setTimeout(setAiPlayer (playerO, playerX, aiXclass, aiOclass),100)
    // setTimeout(setAiPlayer (playerX,playerO),000)
    
}
//////SELECTS PLAYERO AS I FOR CALLBACK/////
function playerOasAI() {
    playerTurnMsg.className = "playerMoveHidden"
    aiOclass.className = 'selected'
    aiXclass.classList.remove('selected')
    resetGameFunction()
    playerX.aiPlayer = false
    playerO.aiPlayer = true
    playerTurnMsg.className = "playerMoveVisible"
    setTimeout(playerTurnMsgTimer,3000)
        // setTimeout(resetGameFunction,200)
    // setTimeout(setAiPlayer (playerO, playerX, aiOclass, aiXclass),200)
}
/////////////PLAYER TURN MESSAGE VS AI////////////
function playerTurnMsgTimer () {
    playerTurnMsg.innerText = "IT'S YOUR TURN"
    playerTurnMsg.className = "playerMoveVisible"
}
/////////////AI TURN MESSAGE////////////
function aiTurnMsgTimer () {
    playerTurnMsg.innerText = "COMPUTER IS THINKING..."
    playerTurnMsg.className = "computerMoveVisible"
}
// function setAiPlayer (ai,human,aiClass1,aiClass2){
//     ai.aiPlayer = true
//     human.aiPlayer = false
//     aiClass1.className = 'selected'
//     aiClass2.classList.remove('selected')
//     playerTurnMsg.className = "playerMoveVisible"
// }