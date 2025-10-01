let buttons = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let newGame = document.querySelector(".newGame");

reset.classList.remove("newGame")

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

let count = 0;
let drawCheck = true;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (count%2===0){
            button.innerHTML = `<span style="color: black;">O</span>`;
            count++;
        } else {
            button.innerHTML = `<span style="color: red;">X</span>`;
            count++;
        }
        button.disabled = true;
        checkWinner();
        if (drawCheck) {
            checkDraw();
        }
    });
});

let declareWinner = (winner) => {
    if (winner=="Draw") {
        msg.innerHTML = "Draw"
    } else {
        msg.innerHTML = `Congratulations! the winner is <span class="winner-highlight"><b>${winner}</b></span>`;
    }
    msgContainer.classList.remove("hide");
    reset.innerHTML = "New Game";
    reset.classList.add("newGame")
    for(let button of buttons) {
        button.disabled = true;
    };
};

let checkDraw = () => {
    if (count==9) {
        declareWinner("Draw")
    }
}

let checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = buttons[pattern[0]].innerHTML; 
        let pos2 = buttons[pattern[1]].innerHTML;
        let pos3 = buttons[pattern[2]].innerHTML;
        if (pos1===pos2 && pos2===pos3 && pos3!= "") {
            declareWinner(pos1);
            drawCheck = false;
            break;
        } 
    };
};

reset.addEventListener("click", () => {
    count = 0;
    drawCheck = true;
    reset.innerHTML = "Reset";
    msgContainer.classList.add("hide");
    reset.classList.remove("newGame")
    for(let button of buttons) {
        button.disabled = false;
        button.innerHTML = "";
    };
});

newGame.addEventListener("click", () => {
    count = 0;
    drawCheck = true;
    reset.innerHTML = "Reset";
    msgContainer.classList.add("hide");
    reset.classList.remove("newGame")
    for(let button of buttons) {
        button.disabled = false;
        button.innerHTML = "";
    };
});









