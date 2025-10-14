let getRandBox = (possibleBoxes) => {
    let n = possibleBoxes.length;
    randBoxid = Math.floor(Math.random()*n);
    randBox = possibleBoxes[randBoxid];
    return randBox;
}

let emptyBoxes = () => {
    let empboxes = [];
    for (i=0;i<9;i++) {
        if (buttons[i].innerText==="") {
            empboxes.push(i);
        }
    }
    return empboxes;
}

let getPatternVals = (pattern) => {
    let patternVals = [];
    for (i=0;i<3;i++) {
        patternVals.push(buttons[pattern[i]].innerText);
    }
    return patternVals;
}

// 4.2 priority - check if any new "X" can be placed without matching any other "X" in any pattern 
//                such that "O" can't make "Trick-1".
let nonMatching = (matchXBoxes) => {
    nonMatchingXBoxes = emptyBoxes().filter(emptyBox => !matchXBoxes.includes(emptyBox));
    safeNonMatchingXBoxes = [];
    nonMatchingXBoxes.forEach((posX) => {
        buttons[posX].innerText="X";
        let trickO = checkTrick("O");
        if (!trickO.length) {
            safeNonMatchingXBoxes.push(posX);
        }
        buttons[posX].innerText="";
    })
    return safeNonMatchingXBoxes;
}

// 4.1 priority - check if any new "X" can be placed to match another "X" in any one pattern but 
//                "O" can't make "Trick-1" while defending this pattern of "X".
let matchWith1 = (match1XBoxes) => {
    safeMatching1XBoxes = [];
    match1XBoxes.forEach((posX) => {
        buttons[posX].innerText="X"; //putting X temporarily in the matching box
        let nxtPosO = defendBoxes("X");
        let trickO = checkTrick("O");
        if (!trickO.includes(nxtPosO[0])) {
            buttons[nxtPosO].innerText = "O"; //putting O temporarily in the defendig box if it cant do "Trick-1"
            let nxtDefendPosX = defendBoxes("O");
            if (nxtDefendPosX.length) {
                buttons[nxtDefendPosX].innerText = "X"; //putting next X in the defending box if it has to defend
                let nxtTrickO = checkTrick("O");
                if (!nxtTrickO.length) {
                    safeMatching1XBoxes.push(posX);
                }
                buttons[nxtDefendPosX].innerText = "";
            } else {
                let unfavoursOfO =[];
                emptyBoxes().forEach(empbox => {
                    buttons[empbox].innerText = "X"; //if X doesn't need to defend "O" then check next X can be placed in any box such that "O" cant do "Trick-1"
                    let nxtTrickO = checkTrick("O");
                    if (!nxtTrickO.length) {
                        unfavoursOfO.push(empbox);
                    }
                    buttons[empbox].innerText = "";
                })
                if (unfavoursOfO.length) {
                    safeMatching1XBoxes.push(posX);
                }
            }
            buttons[nxtPosO].innerText = "";
        }
        buttons[posX].innerText="";
    })
    return safeMatching1XBoxes;
}

// 3rd priority (Trick-1) - check if any new "X" can be placed such that it matches with other "X(s)" in two different patterns.
let checkTrick = (player) => {
    let matchBoxes = [];
    let patternBoxes = [];
    for (let pattern of winPatterns) {
        let patternVals =  getPatternVals(pattern);
        for (i=0;i<3;i++) {
            if (patternVals[(i)%3]==player && patternVals[(i+1)%3]=="" && patternVals[(i+2)%3]==="") {
                matchBoxes.push(pattern[(i+1)%3],pattern[(i+2)%3]);
                patternBoxes.push(pattern);
            }
        }
    }
    let match2Boxes = matchBoxes.filter((item, index) => matchBoxes.indexOf(item) !== index);
    let match1Boxes = matchBoxes.filter(item => matchBoxes.indexOf(item) === matchBoxes.lastIndexOf(item));
    if (player=="O") {
        return match2Boxes;   
    }else if (player=="X") {
        return [match2Boxes,match1Boxes,matchBoxes];
    }
}

// 2nd priority - check whether the "X" needs to defend "O".
let defendBoxes = (opponent) => {
    let defendBoxes = [];
    for (let pattern of winPatterns) {
        let patternVals =  getPatternVals(pattern);
        for (i=0;i<3;i++) {
            if (patternVals[(i)%3]==opponent && patternVals[(i+1)%3]==opponent && patternVals[(i+2)%3]==="") {
                defendBoxes.push(pattern[(i+2)%3]);
            }
        }
    }
    return defendBoxes;
}

// 1st priority - check whether the "X" can fill any of the patterns completely to WIN.
let winBoxesX = () => {
    let winBoxes = [];
    for (let pattern of winPatterns) {
        let patternVals =  getPatternVals(pattern);
        for (i=0;i<3;i++) {
            if (patternVals[(i)%3]=="X" && patternVals[(i+1)%3]=="X" && patternVals[(i+2)%3]==="") {
                winBoxes.push(pattern[(i+2)%3]);
            }
        }
    }
    return winBoxes;
}

// computer's 1st turn - fill any box that would not lead to any possibility that "O" ultimately wins
let comp1stTurn = (clickedBtn) => {
    a = clickedBtn[0];
    b = clickedBtn[1];
    if ((a+b)%2==0 && a!=1) {
        possibleBoxes = [4];
    }else if (a==b==1) {
        possibleBoxes = [0,2,6,8];
    }else {
        possibleBoxes = [];
        for (i=0;i<9;i++) {
            if ((boxIDs[i][0]==a && boxIDs[i][1]!=b) || (boxIDs[i][0]!=a && boxIDs[i][1]==b)){
                possibleBoxes.push(i);
            }
        }
    }
    return possibleBoxes;
}

let compTurn = (clickedBtn) => {
    let targetBoxesX;
    if (count === 1) {
        targetBoxesX = comp1stTurn(clickedBtn);
    }else if (count > 1) {
        let winBoxes = winBoxesX();
        targetBoxesX = winBoxes;
        if (winBoxes.length) {
        }
        if (!winBoxes.length) {
            let defendBoxesX = defendBoxes("O");
            targetBoxesX = defendBoxesX;
            if (defendBoxesX.length) {
            }
            if (!defendBoxesX.length){
                let checkTrickX = checkTrick("X");
                let trickBoxes = checkTrickX[0];
                targetBoxesX = trickBoxes;
                if (trickBoxes.length) {
                }
                if (!trickBoxes.length) {
                    let match1XBoxes = checkTrickX[1];
                    let matchXBoxes = checkTrickX[2];
                    let matchingBoxes = matchWith1(match1XBoxes);
                    let nonMatchingBoxes = nonMatching(matchXBoxes);
                    let defendTrickBoxes = [...matchingBoxes , ...nonMatchingBoxes];
                    targetBoxesX = defendTrickBoxes;
                }
            }
        }
    }
    boxToFillX = getRandBox(targetBoxesX);
    buttons[boxToFillX].innerHTML = `<span style="color: red;">X</span>`;
    buttons[boxToFillX].disabled = true;
    checkWinner();
}