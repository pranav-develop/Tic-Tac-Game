//jshint esversion: 8
let game = [[-1,-1,-1],
            [-1,-1,-1],
            [-1,-1,-1]];

let pvc = false;
let circleTurn = false;
let players = {
    cirlce: "Circle",
    cross: "Cross"
};
function buttonclicked(position){
    let processedClick = processClick(position, circleTurn);
    if(!processedClick){
        return 0; 
    }
    if(pvc){
        let gameOver = checkGameOver(true);
        if(gameOver !== -1){
            return ;
        }
        makeNextMove();
    } else {
        circleTurn = !circleTurn;
    }
    let gameOver = checkGameOver(true);
    if(gameOver !== -1){
        return ;
    }
}
function processClick(position, turnCircle){
    let i = parseInt(position[0]);
    let j = parseInt(position[1]);

    if(game[i][j] === -1){
        if(turnCircle){
            game[i][j] = 0;
            document.getElementById(position).classList.add("circle-outer");
        } else{
            game[i][j] = 1;
            document.getElementById(position).classList.add("cross-outer");
        }
        console.log(game);
        return true;
    } else {
        return false;
    }
}
function selectMode(gameType){
    if(gameType === "pvc"){
        pvc = true;
    }
    document.querySelector(".menu").classList.add("menu-hide");
    console.log(pvc);
}
function checkGameOver(canProcess){
    let winner = getWinner();
    if(winner === -1){
        if(checkDraw(game) === true)
            winner = null;
    }
    if(winner === 0 || winner === 1 || winner === null){
        if(canProcess === true) {
            processGameOver(winner);
        }
        return winner;
    }
    else {
        return -1;
    }
}
function processGameOver(winner){
    let statement;
    if(winner === 1){
        statement = "Cross has won!!!!!!!!";
    } else if(winner === 0){
        statement = "Circle has won!!!!!!!!";
    } else {
        statement = "Oops!!! Game has ended in a Draw";
    }
    document.querySelector(".game-over .text").innerHTML = statement;
    document.querySelector(".game-over").classList.remove("d-none");
}
function makeNextMove(){
    let posi = 0;
    let posj = 0;
    let score = -Infinity;
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if(game[i][j] === -1){
                game[i][j] = 0;
                let newScore = minimax(game, false, 3);
                game[i][j] = -1;
                if(newScore > score){
                    score = newScore;
                    posi = i;
                    posj = j; 
                }
            }
        }
    }
    game[posi][posj] = 0;
    document.getElementById(posi.toString() + posj.toString()).classList.add("circle-outer");
    console.log(posi, posj);
}
function minimax(currentState, isMaximizing, count){
    let gameOver = checkGameOver(false);
    if(gameOver === 1){
        return -1;
    } else if(gameOver === 0){
        return 1;
    } else if(gameOver === null){
        return 0;
    }
    if(isMaximizing === true){
        let score = -Infinity;
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                if(currentState[i][j] === -1){
                    currentState[i][j] = 0;
                    let newScore = minimax(game, false, 3);
                    currentState[i][j] = -1;
                    score = Math.max(score, newScore);
                }
            }
        }
        return score;
    } else {
        let score = Infinity;
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                if(currentState[i][j] === -1){
                    currentState[i][j] = 1;
                    let newScore = minimax(game, true, 3);
                    currentState[i][j] = -1;
                    score = Math.min(score, newScore);
                }
            }
        }
        return score;
    }
}
function playAgain(){
    game = [[-1,-1,-1],
            [-1,-1,-1],
            [-1,-1,-1]];

    pvc = false;
    circleTurn = false;
    document.querySelectorAll(".box").forEach(element => {
        element.classList.remove("circle-outer");
        element.classList.remove("cross-outer");
    });
    document.querySelector(".game-over").classList.add("d-none");
}