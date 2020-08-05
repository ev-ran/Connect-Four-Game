//============Columns
let column_0 = document.querySelector("#col_0");
let column_1 = document.querySelector("#col_1");
let column_2 = document.querySelector("#col_2");
let column_3 = document.querySelector("#col_3");
let column_4 = document.querySelector("#col_4");
let column_5 = document.querySelector("#col_5");
let column_6 = document.querySelector("#col_6");

let button_start = document.querySelector('#start_game');
let button_reset = document.querySelector('#reset_game');

let start_red_ball = document.querySelector('.ball_1');
let start_black_ball = document.querySelector('.ball_2');

let score_red_element = document.querySelector('#total_score_red');
let score_black_element = document.querySelector('#total_score_black');

let score_red = 0;
let score_black = 0;

let start_turn = 0; //what color start new game
let turn = 0; //to change color inside one game
let game_over = false;
let numberOfBallsOnField = 0;

//================================

let playdesk = new Playdesk(6, 7);
deskArray = playdesk.createArray();
playdesk.playBalls();
numberOfBallsOnField = 0;

//====Button Start Game==========

button_start.addEventListener('click', function () {

    startNewGame()
})

//====Button Reset Game==========

button_reset.addEventListener('click', function () {
    cleanField()
    playdesk = new Playdesk(6, 7);
    deskArray = playdesk.createArray();
    game_over = false;
    score_red = 0;
    score_black = 0;
    score_red_element.innerHTML = score_red;
    score_black_element.innerHTML = score_black;
    let start_turn = 2; //what color start new game
    let turn = 2; //to change color inside one game
    numberOfBallsOnField = 0;

    playdesk.playBalls();
})
// console.log(deskArray);

//============Play Field========================

column_0.addEventListener('click', function (event) {
    clickOnColumn()
})
column_1.addEventListener('click', function (event) {
    clickOnColumn()
})
column_2.addEventListener('click', function (event) {
    clickOnColumn()
})
column_3.addEventListener('click', function (event) {
    clickOnColumn()
})
column_4.addEventListener('click', function (event) {
    clickOnColumn()
})
column_5.addEventListener('click', function (event) {
    clickOnColumn()
})
column_6.addEventListener('click', function (event) {
    clickOnColumn()
})

//============Functions===============

function clickOnColumn() {
    let elementID = event.currentTarget.id;

    let column = document.getElementById(elementID);

    if (column.childElementCount < 6 && game_over === false) {

        let color = color_trigger(turn);

        let numInMatrix = matrix_num(turn); // num plased in matrix (red - 1,  black - 2)

        let columnNum = Number(elementID[4]); //number of column in matrix - inside element id

        let rowNum = (6 - column.childElementCount - 1);  //number of row in matrix

        deskArray[rowNum][columnNum] = numInMatrix;  // set number in matrix - with ball

        numberOfBallsOnField++;

        insertBall(color, column);  // insert ball - interface

        let isWinCombination = check(numInMatrix, columnNum, rowNum);

        if (!isWinCombination) {

            if (numberOfBallsOnField === 42) {
                game_over = true;
                allBallsHighlight();
                score_red += 0.5;
                score_black += 0.5;

                score_red_element.innerHTML = score_red;
                score_black_element.innerHTML = score_black;

                scoreAnimation(score_red_element);
                scoreAnimation(score_black_element);

                return;
            } else {
                ++turn;
            }
        }

        // console.log(deskArray);
        // console.log("rowNum" + rowNum);
        // console.log("columnNum" + columnNum);
    }
}

function cleanField() {

    column_0.innerHTML = "";
    column_1.innerHTML = "";
    column_2.innerHTML = "";
    column_3.innerHTML = "";
    column_4.innerHTML = "";
    column_5.innerHTML = "";
    column_6.innerHTML = "";
}

function startNewGame() {
    cleanField()
    playdesk = new Playdesk(6, 7);
    deskArray = playdesk.createArray();


    game_over = false;
    numberOfBallsOnField = 0;
    start_turn++;
    turn = start_turn;


    let i = matrix_num(turn)
    if (i === 1) {
        yourTurnAnimation(start_red_ball);

    } else {
        yourTurnAnimation(start_black_ball);
    }

}

function check(numInMatrix, columnNum, rowNum) {
    let isWin = false;

    //===== check horizontal [connect four] =====
    isWin = connect4_count(numInMatrix, columnNum, rowNum, 1, 0) + 1 + connect4_count(numInMatrix, columnNum, rowNum, -1, 0) >= 4;
    if (isWin === true && game_over === false) {
        game_over = true;

        column_I = document.getElementById("col_" + columnNum);
        element_to_highlight = column_I.children[5 - rowNum];

        wintAnimation(element_to_highlight);

        connect4_hightlight(numInMatrix, columnNum, rowNum, 1, 0);
        connect4_hightlight(numInMatrix, columnNum, rowNum, -1, 0);

        count_score(numInMatrix);

        return isWin;

    }

    //===== check vertical [connect four] =====
    isWin = connect4_count(numInMatrix, columnNum, rowNum, 0, 1) + 1 + connect4_count(numInMatrix, columnNum, rowNum, 0, -1) >= 4;
    if (isWin === true && game_over === false) {
        game_over = true;

        column_I = document.getElementById("col_" + columnNum);
        element_to_highlight = column_I.children[5 - rowNum];

        wintAnimation(element_to_highlight);

        connect4_hightlight(numInMatrix, columnNum, rowNum, 0, 1);
        connect4_hightlight(numInMatrix, columnNum, rowNum, 0, -1);

        count_score(numInMatrix);

        return isWin;

    }


    //===== check diagonal 1 [connect four] =====
    isWin = connect4_count(numInMatrix, columnNum, rowNum, 1, 1) + 1 + connect4_count(numInMatrix, columnNum, rowNum, -1, -1) >= 4;
    if (isWin === true && game_over === false) {
        game_over = true;

        column_I = document.getElementById("col_" + columnNum);
        element_to_highlight = column_I.children[5 - rowNum];

        wintAnimation(element_to_highlight);
        connect4_hightlight(numInMatrix, columnNum, rowNum, 1, 1);
        connect4_hightlight(numInMatrix, columnNum, rowNum, -1, -1);
        count_score(numInMatrix);
        return isWin;

    }
    //===== check diagonal 2 [connect four] =====
    isWin = connect4_count(numInMatrix, columnNum, rowNum, 1, -1) + 1 + connect4_count(numInMatrix, columnNum, rowNum, -1, 1) >= 4;
    if (isWin === true && game_over === false) {
        game_over = true;

        column_I = document.getElementById("col_" + columnNum);
        element_to_highlight = column_I.children[5 - rowNum];

        wintAnimation(element_to_highlight);

        connect4_hightlight(numInMatrix, columnNum, rowNum, 1, -1);
        connect4_hightlight(numInMatrix, columnNum, rowNum, -1, 1);
        count_score(numInMatrix);
        return isWin;

    }

    return isWin;
}

function count_score(numInMatrix) {
    if (numInMatrix === 1) {
        score_red++;
        scoreAnimation(score_red_element);
        score_red_element.innerHTML = score_red;

    } else {
        score_black++;
        scoreAnimation(score_black_element);
        score_black_element.innerHTML = score_black;
    }
}

function connect4_count(numInMatrix, columnNum, rowNum, step_column, step_row) {

    let count = 0;

    let colNN = columnNum + step_column; // Skip the piece at (y, x) to avoid counting it twice
    let rowNN = rowNum + step_row;  // should looking in both directions on a line.

    while (colNN >= 0 && colNN < 7 && rowNN >= 0 && rowNN < 6 && deskArray[rowNN][colNN] === numInMatrix) {
        count++;
        colNN += step_column;
        rowNN += step_row;
    }

    return count;
}


function connect4_hightlight(numInMatrix, columnNum, rowNum, step_column, step_row) {

    let colNNH = columnNum + step_column; // Skip the piece at (y, x) to avoid counting it twice
    let rowNNH = rowNum + step_row;  // should looking in both directions on a line.

    while (colNNH >= 0 && colNNH < 7 && rowNNH >= 0 && rowNNH < 6 && deskArray[rowNNH][colNNH] === numInMatrix) {
        // count++;


        let column_I = document.getElementById("col_" + colNNH);

        let element_to_highlight = column_I.children[5 - rowNNH];

        colNNH += step_column;
        rowNNH += step_row;
        wintAnimation(element_to_highlight);
    }

    // return count;
}

function allBallsHighlight() {
    for (let columnNum = 0; columnNum < 7; columnNum++) {
        let column = document.getElementById('col_' + columnNum);
        for (let childNum = 0; childNum < 6; childNum++) {
            let element_to_highlight = column.children[5 - childNum]
            wintAnimation(element_to_highlight);
        }
    }
}

function color_trigger(turn) {
    if (turn % 2 !== 0) {
        return "red";
    } else {
        return "black";
    }
}

function matrix_num(turn) {
    if (turn % 2 !== 0) {
        return 1;
    } else {
        return 2;
    }
}

function insertBall(color, column) {
    let ball = document.createElement('div');
    ball.className = color;
    column.append(ball)
    startAnimation(ball);
}

//==========ANIMATION===============
function startAnimation(element) {
    return element.animate([
        // keyframes

        { transform: 'translateY(-700px)' },
        { transform: 'translateY(7px)' },
        { transform: 'translateY(-20px)' },

        { transform: 'scale(1)' },
        { transform: 'scale(0.97)' },
        { transform: 'scale(1)' },
    ], {
        // timing options
        duration: 1300
    });
}

function wintAnimation(element) {
    return element.animate([
        // keyframes

        { transform: 'scale(1)' },
        { backgroundColor: 'yellow' },
        { transform: 'scale(1.1)' },
        { transform: 'scale(1)' },
        { transform: 'scale(0.8)' },
        { transform: 'scale(1)' },
    ], {
        // timing options
        duration: 1800
    });
}

function scoreAnimation(element) {
    return element.animate([
        // keyframes

        { transform: 'scale(1)' },
        { color: 'red' },
        { transform: 'scale(1.5)' },
        { transform: 'scale(1)' },
        { transform: 'scale(0.7)' },
        { color: 'red' },
        { transform: 'scale(1)' },
    ], {
        // timing options
        duration: 1000
    });
}

function yourTurnAnimation(element) {
    return element.animate([
        // keyframes

        { transform: 'scale(1)' },
        { transform: 'scale(0.70)' },
        { transform: 'scale(1)' },
        { transform: 'scale(1.25)' },
        { transform: 'scale(1)' },
        { transform: 'scale(0.85)' },
        { transform: 'scale(1)' },
    ], {
        // timing options
        duration: 700
    });
}