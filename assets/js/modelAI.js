var  HUMAN_PLAYER="O";
var COMPUTER_PLAYER="X";
var origBoard;
var isGameOver= false;
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2],
];
const line ={
    0:"H0",
    1:"H1",
    2:"H2",
    3:"V1",
    4:"V2",
    5:"V3",
    6:"diag1",
    7:"diag2"
}
function startgameAI(){
    origBoard = Array.from(Array(9).keys());
}
function endGameAI(){
    gameOver(false);
}
function turnClick(square){
    if(typeof origBoard[square.target.id]=='number'){
        turn(square.target.id,HUMAN_PLAYER);
        setClass("O",square.target.id);
        if(!checkWInAI(origBoard,HUMAN_PLAYER)&&!checkTie()){
            turn(bestSpot(),COMPUTER_PLAYER);
        }
    }
}

function turn(id,player){
    origBoard[id] = player;
    document.getElementById(id).innerText=player;
    setClass("X",id);
    let gameWon = checkWInAI(origBoard,player);
    if(gameWon){
        gameOver(gameWon);
    }
}
function checkWInAI(board,player){
    let plays = board.reduce((a,e,i)=>(e===player)?a.concat(i):a,[]);
    let gameWon =null;
    for(let [index,win] of winCombos.entries()){
        if(win.every(ele=>plays.indexOf(ele)>-1)){
            gameWon={index:index,player:player};
            break;
        }
    }
    return gameWon;
}
function gameOver(gameWon){
    if(gameWon){
    drawLine(line[gameWon.index],gameWon.player+"AI");
    IncrementCounterAI(gameWon.player);
    }
    var cells = document.getElementsByTagName("td");
    for(let i=0;i<cells.length;i++){
        cells[i].removeEventListener("click",turnClick,false);
    }
}
function emptySquares(){
    return origBoard.filter(s=> typeof s=='number');
}
function bestSpot(){
    var result = minmax(origBoard,COMPUTER_PLAYER);
    return result.index;
}
function checkTie(){
    if(emptySquares().length==0){
        isGameOver=true;
        return true;
    }else{
        return false;
    }
}
function minmax(newBoard,player){
    var availSpots = emptySquares();
    if(checkWInAI(newBoard,HUMAN_PLAYER)){
        isGameOver=true;
        return {score:-10};
    }else if(checkWInAI(newBoard,COMPUTER_PLAYER)){
        isGameOver=true;
        return {score:10};
    }else if(availSpots.length==0){
        isGameOver=true;
        return {score:0};
    }
    var moves = [];
    for(let i=0;i<availSpots.length;i++){
        var move = {};
        move.index =newBoard[availSpots[i]];
        newBoard[availSpots[i]]=player;

        if(player==COMPUTER_PLAYER){
            var result = minmax(newBoard,HUMAN_PLAYER);
            move.score = result.score;
        }else{
            var result = minmax(newBoard,COMPUTER_PLAYER);
            move.score = result.score;
        }
        newBoard[availSpots[i]] = move.index;
        moves.push(move);
    }

    var bestMove;
    if(player==COMPUTER_PLAYER){
        var bestScore=-10000;
        for(let i=0;i<moves.length;i++){
            if(moves[i].score >bestScore){
                bestScore = moves[i].score;
                bestMove=i;
            }
        }
    }else{
        var bestScore=10000;
        for(let i=0;i<moves.length;i++){
            if(moves[i].score <bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }   
    }
    return moves[bestMove];
}
