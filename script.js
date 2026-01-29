// const e = require("express");

//your JS code here. If required.
let playerForm = document.getElementById("player-form");
let gamespace = document.getElementById("game-space");
let turn = document.getElementById("turn-info");
let btn = document.getElementById("submit");
btn.addEventListener("click", function(e) {
    e.preventDefault();
   let player1 = document.getElementById("player1").value;
   let player2 = document.getElementById("player2").value;
    if (player1 === "" || player2 === "") {
        alert("Please enter names for both players.");
        return;
    }
    turn.innerText = player1 + ", you're up";
    turn.style.display = "block";
    gamespace.style.display = "grid";
    playerForm.style.display = "none";
});

let winnerAttempt = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let cells = document.querySelectorAll("#game-space div");
let turnO = true;
let moves = 0;
cells.forEach(function(cell) {
    cell.addEventListener("click", function() {
       if (moves === 9 && !checkWinner()) {
    let showmsg = document.getElementById("winner-info");
    showmsg.style.display = "block";
    showmsg.innerText = "🤝 Game Draw!";
}else{
        if (turnO && cell.innerText === "") {
            cell.innerText = "o";
            moves++;
            if (checkWinner()) return;
            turnO = false;
            turn.innerText = document.getElementById("player2").value + ", you're up";
            
        }
        else if (!turnO && cell.innerText === "") {
            cell.innerText = "x";
            moves++;
            if (checkWinner()) return;
            turnO = true;
            turn.innerText = document.getElementById("player1").value + ", you're up";
            
        }
       }
     })
    });



    function checkWinner() {
    for (let combo of winnerAttempt) {
        let a = cells[combo[0]].innerText;
        let b = cells[combo[1]].innerText;
        let c = cells[combo[2]].innerText;

        if (a !== "" && a === b && b === c) {
            let winnerName = a === "o"
                ? document.getElementById("player1").value
                : document.getElementById("player2").value;

            let showmsg = document.getElementById("winner-info");
            showmsg.style.display = "block";
            showmsg.innerText = `🎉 ${winnerName} congratulations you won!`;

            // stop further clicks
            cells.forEach(cell => cell.style.pointerEvents = "none");
            return true;
        }
    }
    return false;
}
