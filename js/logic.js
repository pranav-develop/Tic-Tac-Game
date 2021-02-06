//jshint esversion:8
let game = [[-1,-1,-1],
            [-1,-1,-1],
            [-1,-1,-1]];

let gameOver = false;
let cvp = false;
let pvp = false;
let computerchance = false;
function checkDigonal(value){
    let count1 = 0, count2 = 0;
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if(i===j && value === game[i][j]){
                count1++;
            }
            if(Math.abs(i-j) === 2 && value===game[i][j]){
                count2++;
            }
        }
    }
    if(count1===3 || count2 === 3) return true;
    return false;
} 
function checkStraight(value){
    for(let i=0; i<3; i++){
        let temp = true;
        for(let j=0; j<3; j++){
            if(game[i][j] !== value) temp = false;
        }
        if(temp === true) return true;
    }
}
function checkVertical(value){
    let won1 = true;
    let won2 = true;
    let won3 = true;
    for(let i=0; i<3; i++){
        if(game[i][0] !== value){
            won1 = false;
        }
    }
    for(let i=0; i<3; i++){
        if(game[i][1] !== value){
            won2 = false;
        }
    }
    for(let i=0; i<3; i++){
        if(game[i][2] !== value){
            won3 = false;
        }
    }
    return won1 || won2 || won3;
}
function checkForWin(){
    if(checkDigonal(0) || checkStraight(0) || checkVertical(0)){
        console.log("Circle has won");
        gameOver = true;
        gameOverHogaya("Circle");
    }
    if(checkDigonal(1) || checkStraight(1) || checkVertical(1)){
        console.log("Cross has won");
        gameOver = true;
        gameOverHogaya("Cross");
    }
}
function gameOverHogaya(name){
    document.querySelector(".game-over").classList.remove("d-none");
    document.querySelector(".game-over .text").innerHTML = name + " has Won!!!";
}
let circleTurn = false;
function buttonclicked(positon){
    if(pvp){
        let i = parseInt(positon[0]);
        let j = parseInt(positon[1]);
        if(game[i][j] === -1){
            if(circleTurn){
                game[i][j] = 0;
                document.getElementById(positon).classList.add("circle-outer");
                circleTurn = !circleTurn;

            } else {
                game[i][j] = 1;
                document.getElementById(positon).classList.add("cross-outer");
                circleTurn = !circleTurn;
            }
        }
        if(!gameOver){
            checkForWin();
        }
    } else if(pvc && computerchance === true){
        
        let position = calculateNextMove(game, true, 3);
    }
}
function refresh(){
    location.reload();
}
function selectMode(gameType) {
    if(gameType === "pvc")
        pvc = true;
    else if(gameType === "pvp")
        pvp = true;
    document.querySelector(".menu").classList.add("menu-hide");
} 
function calculateNextMove(currentState, computerChance, count){
    if(count === 0){
        return;
    }
}