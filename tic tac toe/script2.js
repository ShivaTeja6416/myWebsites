let buttons = document.querySelectorAll(".box");
let resetGame = document.querySelectorAll(".resetGame");
let reset = document.querySelector(".reset");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

const boxIDs = [
    [0,0],[0,1],[0,2],
    [1,0],[1,1],[1,2],
    [2,0],[2,1],[2,2]
];

let count = 0;
let timeout = null;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        button.innerHTML = `<span style="color: black;">O</span>`;
        count++;
        button.disabled = true;
        checkWinner();
        if (count!=0) {
            compTurn(event.target.id);
        }
    })
})

let remBlinking = (pattern) => {
    buttons.forEach((btn,idx) => {
        if (!pattern.includes(idx)) {
            btn.classList.remove("blinking");
            btn.classList.add("grey-out");
        }
    })
}

let declareWinner = (winner,pattern) => {
    if (winner=="Draw") {
        msg.innerHTML = `<span class="big-text">DRAW🫱🏻‍🫲🏼</span>`;
    } else if (winner=="X") {
        msg.innerHTML = `<span class="big-text" style="color: #e63030ff">YOU LOSE !</span>`;
    }else {
        msg.innerHTML = `<span class="big-text">Congratulations🎉</span><br><span class="big-text" style="color: green">YOU WON !</span>`;
    }
    remBlinking(pattern);
    msgContainer.classList.remove("hide");
    reset.innerHTML = "New Game";
    reset.classList.add("newGame");
}

let addBlinking = (pattern) => {
    buttons.forEach((btn,idx) => {
        if (!pattern.includes(idx)) {
            btn.disabled = true;
            btn.classList.add("blinking");
        }
    })
}

let waitToDeclare = (winner,pattern) => {
    count = 0;
    addBlinking(pattern);
    timeout = setTimeout(declareWinner,1500,winner,pattern);
}

let checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos =  [buttons[pattern[0]].innerText,
                   buttons[pattern[1]].innerText,
                   buttons[pattern[2]].innerText]
        if (pos[0]===pos[1] && pos[1]===pos[2] && pos[2]!= "") {
            waitToDeclare(pos[0],pattern);
            break;
        } 
    }
    if (count==5) {
        waitToDeclare("Draw",[]);
    }
}

let enableAllBoxes = () => {
    buttons.forEach((btn) => {
        btn.disabled = false;
        btn.innerHTML = "";
        btn.classList.remove("blinking", "grey-out");
    })
}

resetGame.forEach((btn) => {
    btn.addEventListener("click", () => {
        clearTimeout(timeout);
        count = 0;
        reset.classList.remove("newGame")
        reset.innerHTML = "Reset";
        msgContainer.classList.add("hide");
        enableAllBoxes();
    })
})









