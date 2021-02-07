//jshint esversion:8
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
    if(value === game[1][1]){
        count2++;
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
function getWinner(){
    if(checkDigonal(0) || checkStraight(0) || checkVertical(0)){
        // console.log("Circle has won");
        return 0;
    }
    if(checkDigonal(1) || checkStraight(1) || checkVertical(1)){
        // console.log("Cross has won");
        return 1;
    }
    return -1;
}
function checkDraw(board){
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if(board[i][j] === -1){
                return false;
            }
        }
    }
    return true;
}
function refresh(){
    location.reload();
}