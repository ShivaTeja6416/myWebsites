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
let clickedBtns = [];
let clickTypes = [];

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        button.innerHTML = `<span style="color: black;">O</span>`;
        count++;
        clickedBtns.push(event.target.id);
        button.disabled = true;
        checkWinner();
        checkDraw();
        compTurn(event.target.id);
    });
});

let getRand = (possibleBoxes) => {
    let n = possibleBoxes.length;
    randBoxid = Math.floor(Math.random()*n);
    randBox = possibleBoxes[randBoxid];
    return randBox;
};

let justFill = () => {
    console.log("justFill");
    let possibleBoxes = [];
    for (i=0;i<9;i++) {
        if (buttons[i].innerText==="") {
            possibleBoxes.push(i);
        }
    }
    randBox = getRand(possibleBoxes);
    return randBox;
}

let tryMatch = () => {
    let possibleBoxes = [];
    let justFillIf8 = 0 ;
    for (let pattern of winPatterns) {
        let pos =  [buttons[pattern[0]].innerText,
                    buttons[pattern[1]].innerText,
                    buttons[pattern[2]].innerText]
        if ((pos[0]==="X" || pos[1]==="X" || pos[2]==="X") && (pos[0]!="O" && pos[1]!="O" && pos[2]!="O")) {
            for (i=0;i<3;i++) {
                if (pos[i]==="") {
                    possibleBoxes.push(pattern[i]);
                    randBox = getRand(possibleBoxes);
                }
            }
        }else {
            justFillIf8++;
        }
    }
    if (justFillIf8===8) {
        randBox = justFill();
    }else {
        console.log("tryMatch");
    }
    return randBox;
}

let defend = () => {
    let possibleBoxes = [];
    let tryMatchIf8 = 0;
    for (let pattern of winPatterns) {
        let pos =  [buttons[pattern[0]].innerText,
                    buttons[pattern[1]].innerText,
                    buttons[pattern[2]].innerText]
        if (((pos[0]==="O" && pos[1]==="O") || (pos[1]==="O" && pos[2]==="O") || (pos[2]==="O" && pos[0]==="O")) && (pos[0]==="" || pos[1]==="" || pos[2]==="")) {
            for (i=0;i<3;i++) {
                if (pos[i]==="") {
                    possibleBoxes.push(pattern[i]);
                    randBox = getRand(possibleBoxes);
                }
            }
        }else {
            tryMatchIf8++;
        }
    }
    if (tryMatchIf8===8) {
        randBox = tryMatch();
    }else {
        console.log("defend");
    }
    return randBox;
}

let checkToWin = () => {
    let possibleBoxes = [];
    let defendIf8 = 0 ;
    for (let pattern of winPatterns) {
        let pos =  [buttons[pattern[0]].innerText,
                    buttons[pattern[1]].innerText,
                    buttons[pattern[2]].innerText]
        if ((pos[0]==="X" && pos[1]==="X" && pos[2]!="O") || (pos[1]==="X" && pos[2]==="X" && pos[0]!="O") || (pos[2]==="X" && pos[0]==="X" && pos[1]!="O")) {
            for (i=0;i<3;i++) {
                if (pos[i]==="") {
                    possibleBoxes.push(pattern[i]);
                    randBox = getRand(possibleBoxes);
                }
            }
        }else {
            defendIf8++;
        }
    }
    if (defendIf8===8) {
        randBox = defend();
    }else {
        console.log("Made Win");
    }
    return randBox;
}

let compTurn = (clickedBtn) => {
    if (count === 1) {
        if (clickedBtn==="0" || clickedBtn==="2" || clickedBtn==="6" ||clickedBtn==="8") {
            clickTypes[0] = 1;
            randBox = 4;
        }else if (clickedBtn==="4") {
            clickTypes[0] = 2;
            possibleBoxes = [0,2,6,8];
            randBox = getRand(possibleBoxes);
        }else {
            clickTypes[0] = 3;
            if (clickedBtn==="1") {
                possibleBoxes = [0,2,4,7];
                randBox = getRand(possibleBoxes);
            }else if (clickedBtn==="3") {
                possibleBoxes = [0,4,5,6];
                randBox = getRand(possibleBoxes);
            }else if (clickedBtn==="5") {
                possibleBoxes = [2,3,4,8];
                randBox = getRand(possibleBoxes);
            }else if (clickedBtn==="7") {
                possibleBoxes = [1,4,6,8];
                randBox = getRand(possibleBoxes);
            }
        }
    }else if (count > 1) {
        randBox = checkToWin();
    }
    buttons[randBox].innerHTML = `<span style="color: red;">X</span>`;
    buttons[randBox].disabled = true;
    checkWinner();
}

let disableBoxes = () => {
    for(let button of buttons) {
        button.disabled = true;
    };
};

let greyOut = () => {
    buttons.forEach((btn) => {
        btn.classList.add("grey-out");
    })
}

let enableBoxes = () => {
    for(let btn of buttons) {
        btn.disabled = false;
        btn.innerHTML = "";
        btn.classList.remove("grey-out");
    };
};

let addBlinking = () => {
    buttons.forEach((btn) => {
        btn.classList.add("blinking");
    })
}

let remBlinking = () => {
    buttons.forEach((btn) => {
    btn.classList.remove("blinking");
    })
};

let waitToDeclare = (winner) => {

    addBlinking();
    disableBoxes();
    count = 0;
    clickedBtns = [];

    setTimeout(remBlinking,2000);
    setTimeout(declareWinner,2000,winner);
    setTimeout(greyOut,2000);
};

let declareWinner = (winner) => {
    if (winner=="Draw") {
        msg.innerHTML = "Draw"
    } else {
        msg.innerHTML = `Congratulations! the winner is <span class="winner-highlight"><b>${winner}</b></span>`;
    };
    msgContainer.classList.remove("hide");
    reset.innerHTML = "New Game";
    reset.classList.add("newGame");
};

let checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos =  [buttons[pattern[0]].innerHTML,
                   buttons[pattern[1]].innerHTML,
                   buttons[pattern[2]].innerHTML]
        if (pos[0]===pos[1] && pos[1]===pos[2] && pos[2]!= "") {
            waitToDeclare(pos[0]);
            drawCheck = false;
            break;
        } 
    };
};

let checkDraw = () => {
    if (clickedBtns.length==5) {
        waitToDeclare("Draw")
    }
}

reset.addEventListener("click", () => {
    count = 0;
    clickedBtns = [];
    clickTypes = [];
    drawCheck = true;
    reset.innerHTML = "Reset";
    msgContainer.classList.add("hide");
    reset.classList.remove("newGame");
    enableBoxes();
});

newGame.addEventListener("click", () => {
    drawCheck = true;
    clickTypes = [];
    reset.innerHTML = "Reset";
    msgContainer.classList.add("hide");
    reset.classList.remove("newGame");
    enableBoxes();
});









