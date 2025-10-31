
const borderBox = document.querySelector("#border-box");
const gameBoard = document.querySelector("#game-board");
const modal = document.querySelector(".promotion-modal");
const whitesCaptured = document.querySelector(".left-panel .upper .whites-captured");
const blacksCaptured = document.querySelector(".left-panel .lower .blacks-captured");
const undo = document.querySelector(".undo");
const redo = document.querySelector(".redo");

const pieces = ["rook", "knight", "bishop", "queen", "king","pawn"];

// setup
// Board-border setup
const topWall = borderBox.querySelector("#top-wall");
const bottomWall = borderBox.querySelector("#bottom-wall");
const leftWall = borderBox.querySelector("#left-wall");
const rightWall = borderBox.querySelector("#right-wall");
const borderWalls = [topWall, bottomWall, leftWall, rightWall]
for (i=0;i<8;i++) {
    for (j=0;j<4;j++) {
        const span = document.createElement("span");
        if (j<2) {
            span.innerText = `${String.fromCharCode(i+97)}`;
        }else {
            span.innerText = `${8-i}`;
        }
        borderWalls[j].appendChild(span);
    }
}
// Board setup
for (i=0;i<8;i++) {
    for (j=0;j<8;j++) {
        let box = document.createElement("div");
        box.classList.add("box");
        box.id = `${i+1}${j+1}`;
        if ((i+j)%2 ) {
            box.classList.add("black-box");
        }else {
            box.classList.add("white-box");
        }
        gameBoard.appendChild(box);
    }
}
let boxes = document.querySelectorAll(".box");
// Pieces-setup
let piecesB =[]; //Black-pieces
for (i=0;i<16;i++) {
    let piece = document.createElement("i");
    if (i<5) {
        piece.classList.add("fa-solid", `fa-chess-${pieces[i]}`, "iconB");
        piece.name = pieces[i];
    }else if (i<8) {
        piece.classList.add("fa-solid", `fa-chess-${pieces[7-i]}`, "iconB");
        piece.name = pieces[7-i];
    }else {
        piece.classList.add("fa-solid", `fa-chess-${pieces[5]}`, "iconB", "small-icon");
        piece.name = pieces[5];
    }
    piece.id = `ob${i}`;
    piece.color = "black";
    piecesB.push(piece);
}
let piecesW =[]; //White-pieces
for (i=0;i<16;i++) {
    let piece = document.createElement("i");
    if (i<5) {
        piece.classList.add("fa-solid", `fa-chess-${pieces[i]}`, "iconW");
        piece.name = pieces[i];
    }else if (i<8) {
        piece.classList.add("fa-solid", `fa-chess-${pieces[7-i]}`, "iconW");
        piece.name = pieces[7-i];
    }else {
        piece.classList.add("fa-solid", `fa-chess-${pieces[5]}`, "iconW", "small-icon");
        piece.name = pieces[5];
    }
    piece.id = `ow${i}`;
    piece.color = "white";
    piecesW.push(piece);
}
// Captured pieces box Setup
for (i=0;i<5;i++) {  //White-pieces
    const boxW = document.createElement("div");
    const countBoxW = document.createElement("div");
    countBoxW.classList.add("count-box-whites", "count-box");
    countBoxW.value = 0
    countBoxW.innerText = countBoxW.value;
    const pieceW = document.createElement("i");

    const boxB = document.createElement("div");
    const countBoxB = document.createElement("div");
    countBoxB.classList.add("count-box-blacks", "count-box");
    countBoxB.value = 0
    countBoxB.innerText = countBoxB.value;
    const pieceB = document.createElement("i");
    if (i<4) {
        pieceW.classList.add("fa-solid", `fa-chess-${pieces[i]}`, "iconW");
        boxW.classList.add(`captured-${pieces[i]}-box`, "whites-captured-box");
        boxW.name = pieces[i];

        pieceB.classList.add("fa-solid", `fa-chess-${pieces[i]}`, "iconB");
        boxB.classList.add(`captured-${pieces[i]}-box`, "blacks-captured-box");
        boxB.name = pieces[i];
    }else if (i==4) {
        pieceW.classList.add("fa-solid", `fa-chess-${pieces[5]}`, "iconW", "small-icon");
        boxW.classList.add("captured-pawn-box", "whites-captured-box");
        boxW.name = pieces[5];

        pieceB.classList.add("fa-solid", `fa-chess-${pieces[5]}`, "iconB", "small-icon");
        boxB.classList.add("captured-pawn-box", "blacks-captured-box");
        boxB.name = pieces[5];
    }
    whitesCaptured.appendChild(boxW);
    boxW.append(pieceW,countBoxW);

    blacksCaptured.appendChild(boxB);
    boxB.append(pieceB,countBoxB);
}
// Re-arrange all the pieces
let whitesTurn = true, count = 0;
let castlingPieces = ["rookBL", "rookBR", "kingB", "rookWL", "rookWR", "kingW"];
let castlingPieceBoxes = ["11", "18", "15", "81", "88", "85"];
let disturbedCastlingPieces = [];
const reArrange = () => {
    whitesTurn = true, count = 0;
    disturbedCastlingPieces = [];
    for (i=0;i<4;i++) {
        for (j=0;j<8;j++) {
            let box;
            if (i<2) {
                box = boxes[i*8+j];
                box.appendChild(piecesB[i*8+j]);
            }else {
                box = boxes[72-i*8+j];
                box.appendChild(piecesW[(i-2)*8+j]);
            }
        }
    }
}
reArrange();

const addDotsAndShade = (clickedBox, stepBoxes, killBoxes, castleBoxes) => {
    if (stepBoxes.length || killBoxes.length) {
        clickedBox.classList.add("glow");
    }else {
        clickedBox.classList.add("grey");
    }
    stepBoxes.forEach((stepBox, idx) => {
        let dot = document.createElement("div");
        dot.classList.add("dot");
        setTimeout( () => {
            stepBox.appendChild(dot);
        }, (idx%5)*50+150);
        stepBox.classList.add("select");
    })
    setTimeout(() => {
        killBoxes.forEach((killBox,idx) => {
            killBox.classList.add("red-shade", "select");
        })
        castleBoxes.forEach((castleBox, idx) => {
            setTimeout(() => {
                castleBox.classList.add("castle-glow", "select");
            }, idx*50);
        })
    }, (Math.min(stepBoxes.length,4))*50+100);
}

const remDotsAndShade = () => {
    boxes.forEach(box => {
        if (box.classList.contains("glow")) {
            box.classList.remove("glow");
        }
        if (box.classList.contains("grey")) {
            box.classList.remove("grey");
        }
        if (box.querySelector(".dot")) {
            box.querySelector(".dot").remove();
            box.classList.remove("select");
        }
        if (box.classList.contains("red-shade")) {
            box.classList.remove("red-shade");
        }
        if (box.classList.contains("promotion-glow")) {
            box.classList.remove("promotion-glow");
        }
        if (box.classList.contains("kill-box")) {
            box.classList.remove("kill-box");
        }
        if (box.classList.contains("castle-glow")) {
            box.classList.remove("castle-glow");
        }
        if (box.classList.contains("select")) {
            box.classList.remove("select");
        }
        if (box.classList.contains("red-shade-king")) {
            box.classList.remove("red-shade-king");
        }
    })
}

const getBlackPieceBoxes = () => {
    let activeBoxes = [];
    boxes.forEach(box => {
        if (box.querySelector(".iconB")) {
            activeBoxes.push(box);
        }
    })
    return activeBoxes;
}
const getWhitePieceBoxes = () => {
    let activeBoxes = [];
    boxes.forEach(box => {
        if (box.querySelector(".iconW")) {
            activeBoxes.push(box);
        }
    })
    return activeBoxes;
}

let killedPieces = [];
const updateKillCount = (killedPiece) => {
    killedPieces.push(killedPiece);
    killedPiece.remove();
    let capturedBoxes;
    if (killedPiece.color=="white") {
        capturedBoxes = document.querySelectorAll(".whites-captured-box");
    }else {
        capturedBoxes = document.querySelectorAll(".blacks-captured-box");
    }
    capturedBoxes.forEach(capturedBox => {
        if (capturedBox.name==killedPiece.name) {
            let countBox = capturedBox.querySelector(".count-box");
            let piece = capturedBox.querySelector(".fa-solid");
            piece.classList.add("on");
            countBox.value++;
            countBox.innerHTML = `<span style = "color: rgb(215, 0, 0);">${countBox.value}</span>`;
        }
    })
}

const getPieceMoves = (box) => {
    const piece = box.querySelector("i");
    let allBoxes = [];
    if (piece.name=="pawn") {
        allBoxes = pawnMoves(box.id);
    }
    if (piece.name=="rook") {
        allBoxes = rookMoves(box.id);
    }
    if (piece.name=="knight") {
        allBoxes = knightMoves(box.id);
    }
    if (piece.name=="bishop") {
        allBoxes = bishopMoves(box.id);
    }
    if (piece.name=="queen") {
        let rookBoxes = rookMoves(box.id);
        let bishopBoxes = bishopMoves(box.id);
        allBoxes.push(rookBoxes[0].concat(bishopBoxes[0]));
        allBoxes.push(rookBoxes[1].concat(bishopBoxes[1]));
    }
    if (piece.name=="king") {
        allBoxes = kingMoves(box.id);
    }
    return allBoxes;
}

const enableMoves = (box, check) => {
    remDotsAndShade();
    if (movesController) {
        movesController.abort();
    }
    const piece = box.querySelector("i");
    let allBoxes = validBoxes(box, piece, check);
    let stepBoxes = allBoxes[0];
    let killBoxes = allBoxes[1];
    let castleBoxes = allBoxes[2];
    if (check) {
        let kingPiece;
        if (whitesTurn) {
            kingPiece = piecesW[4];
        }else {
            kingPiece = piecesB[4];
        }
        if (!stepBoxes.length && !killBoxes.length) {
            setTimeout(() => {
                kingPiece.parentElement.classList.add("red-shade-king");
            },5)
        }else {
            kingPiece.parentElement.classList.add("red-shade-king");
        }
    }
    addDotsAndShade(box, stepBoxes, killBoxes, castleBoxes);
    movesController = new AbortController();
    stepBoxes.forEach(stepBox => {
        stepBox.addEventListener("click",evt => {movePiece(box,piece,stepBox,null,castleBoxes)}, {signal: movesController.signal});
    })
    killBoxes.forEach(killBox => {
        let killPiece = killBox.querySelector("i")
        killBox.addEventListener("click",evt => {movePiece(box,piece,killBox,killPiece)}, {signal: movesController.signal});
    })
}

const checkForCHECK = () => {
    let activeBoxesOpp = [];
    let check = false;
    if (whitesTurn) {
        activeBoxesOpp = getBlackPieceBoxes();
    }else {
        activeBoxesOpp = getWhitePieceBoxes();
    }
    for (const activeBoxOpp of activeBoxesOpp) {
        let killBoxesOpp = getPieceMoves(activeBoxOpp)[1];
        for (const killBoxOpp of killBoxesOpp) {
            let killPieceOwn = killBoxOpp.querySelector("i");
            if (killPieceOwn.name == "king") {
                check = true;
                break;
            }
        }
        if (check) {
            break;
        }
    }
    return check;
}

// const activateRedo = () => {
//     count++;
//     console.log("redo", count);
// }


let movesHistory = [];
const activateUndo = () => {
    // redo.addEventListener("click", activateRedo);
    // redo.classList.add("allow");
    count--;
    boxes.forEach(box => {
        if (box.classList.contains("active")) {
            box.classList.remove("active");
        }
    })

    let prevMove = movesHistory[count];
    let startBox = document.getElementById(`${prevMove[0]}`);
    let piece;
    let endBox = document.getElementById(`${prevMove[2]}`);
    let killedPieceID = prevMove[3], promoted = prevMove[4], castled = prevMove[5], castlingPieceDisturbed = prevMove[6];
    if (promoted) {
        piece = promotedPawns.at(-1);
        promotedPawns.pop();
        let promotedPiece = endBox.querySelector("i");
        promotedPiece.remove();   
    }else {
        piece = document.getElementById(`${prevMove[1]}`);
    }
    
    if (killedPieceID) {
        let killedPiece = killedPieces.at(-1);
        killedPieces.pop();
        endBox.appendChild(killedPiece);
        let capturedBoxes;
        if (killedPiece.color=="white") {
            capturedBoxes = document.querySelectorAll(".whites-captured-box");
        }else {
            capturedBoxes = document.querySelectorAll(".blacks-captured-box");
        }
        capturedBoxes.forEach(capturedBox => {
            if (capturedBox.name==killedPiece.name) {
                let countBox = capturedBox.querySelector(".count-box");
                let piece = capturedBox.querySelector(".fa-solid");
                if (countBox.value>0) {
                    countBox.value--;
                    countBox.innerHTML = `<span style = "color: rgb(215, 0, 0);">${countBox.value}</span>`;
                }
                if (countBox.value==0) {
                    piece.classList.remove("on"); 
                    countBox.innerHTML = `${countBox.value}`;  
                }
            }
        })
    }

    if (castled) {
        for (i=0;i<4;i++) {
            if (endBox.id==castlingBoxes[i]) {
                let rookBox = document.getElementById(`${rookStartBoxes[i]}`);
                rookBox.appendChild(rookPieces[i]);
            }
        }
    }

    if (castlingPieceDisturbed) {
        disturbedCastlingPieces.pop();
    }

    startBox.appendChild(piece);
    selectionController.abort();
    movesController.abort();

    if (endBox.classList.contains("promotion-glow")) {
        remDotsAndShade();
        modal.parentElement.classList.remove("promotion");
        modal.replaceChildren();
        selectPiece();
    }else {
        remDotsAndShade();
        whitesTurn = !whitesTurn;
        if (!whitesTurn) {
            borderBox.classList.add("black");
        }else {
            borderBox.classList.remove("black");
        }

        selectPiece();
    }
}

let selectionController, movesController;
const selectPiece = ()=> {
    if (count==1) {
        undo.addEventListener("click", activateUndo);
        undo.classList.add("allow");
    }else if (count==0) {
        undo.removeEventListener("click", activateUndo);
        undo.classList.remove("allow");
    }
    let check = checkForCHECK();
    if (check) {
        let kingPiece;
        if (whitesTurn) {
            kingPiece = piecesW[4];
        }else {
            kingPiece = piecesB[4];
        }
        kingPiece.parentElement.classList.add("red-shade-king");

    }
    let activeBoxes;
    if (whitesTurn) {
        activeBoxes = getWhitePieceBoxes();
    }else {
        activeBoxes = getBlackPieceBoxes();
    }
    selectionController = new AbortController();
    activeBoxes.forEach(box => {
        box.classList.add("active");
        box.addEventListener("click",(evt) => {enableMoves(box, check)}, {signal: selectionController.signal});
    })
}
selectPiece();

promotedPawns = [];
const promotionModal = (newBox,piece) => {
    modal.parentElement.classList.add("promotion");
    newBox.classList.add("promotion-glow");
    for (i=0;i<4;i++) {
        let box = document.createElement("div");
        let promotionPiece = document.createElement("i");
        if (i%2) {
            box.classList.add("promotion-piece-boxes", "black");
        }else {
            box.classList.add("promotion-piece-boxes", "white");
        }
        if (whitesTurn) {
            promotionPiece.classList.add("fa-solid", `fa-chess-${pieces[i]}`, "iconW");
            promotionPiece.name = pieces[i];
            promotionPiece.color = "white";
            promotionPiece.id = `p${piece.id.slice(1)}`;
        }else {
            promotionPiece.classList.add("fa-solid", `fa-chess-${pieces[i]}`, "iconB");
            promotionPiece.name = pieces[i];
            promotionPiece.color = "black";
            promotionPiece.id = `p${piece.id.slice(1)}`;
        }
        box.appendChild(promotionPiece);
        modal.appendChild(box);
    }
    let boxes = document.querySelectorAll(".promotion-piece-boxes");
    boxes.forEach(box => {
        box.addEventListener("click", () => {
            movesHistory[count-1][4] = true;
            let selectedPiece = box.querySelector("i");
            piece.remove();
            promotedPawns.push(piece);
            newBox.appendChild(selectedPiece);
            remDotsAndShade();
            modal.parentElement.classList.remove("promotion");
            modal.replaceChildren();
            whitesTurn = !whitesTurn;
            if (!whitesTurn) {
                borderBox.classList.add("black");
            }else {
                borderBox.classList.remove("black");
            }
            selectPiece();
        })
    })
}

const castlingBoxes = ["13", "17", "83", "87"], rookPieces = [piecesB[0],piecesB[7],piecesW[0],piecesW[7]],
      rookStartBoxes = ["11", "18", "81", "88"], rookEndBoxes = ["14", "16", "84", "86"];
const castle = (castleBox) => {
    for (i=0;i<4;i++) {
        if (castleBox.id==castlingBoxes[i]) {
            let rookBox = document.getElementById(`${rookEndBoxes[i]}`);
            rookBox.appendChild(rookPieces[i]);
        }
    }
}

const movePiece = (box, piece, newBox, killPiece, castleBoxes) => {
    // redo.removeEventListener("click", activateRedo);
    // redo.classList.remove("allow");
    count++;

    boxes.forEach(box => {
        if (box.classList.contains("active")) {
            box.classList.remove("active");
        }
    })

    let castlingPieceDisturbed = false;
    for (i=0;i<6;i++) {
        if ((box.id==castlingPieceBoxes[i] || newBox.id==castlingPieceBoxes[i]) && !disturbedCastlingPieces.includes(castlingPieces[i])) {
            disturbedCastlingPieces.push(castlingPieces[i]);
            castlingPieceDisturbed = true;
        }
    }

    let killedPieceID = null;
    if (killPiece) {
        updateKillCount(killPiece);
        killedPieceID = killPiece.id;
    }
    
    let castled = false;
    if (castleBoxes) {
        castleBoxes.forEach(castleBox => {
            if (castleBox.id==newBox.id) {
                castle(castleBox);
                castled = true;
            }
        })
    }

    newBox.appendChild(piece);
    selectionController.abort();
    movesController.abort();

    let promoted = false;
    if (piece.name=="pawn" && ((piece.color=="black" && box.id[0]=="7") || (piece.color=="white" && box.id[0]=="2"))) {
        remDotsAndShade();
        promotionModal(newBox,piece,promoted);
    }else {
        remDotsAndShade();
        whitesTurn = !whitesTurn;
        if (!whitesTurn) {
            borderBox.classList.add("black");
        }else {
            borderBox.classList.remove("black");
        }

        selectPiece();
    }
    movesHistory = movesHistory.slice(0,count-1);
    movesHistory.push([box.id, piece.id, newBox.id, killedPieceID, promoted, castled, castlingPieceDisturbed]);
}

const validBoxes = (box, piece, check) => {

    let allBoxes = getPieceMoves(box);
    let stepBoxes = allBoxes[0];
    let killBoxes = allBoxes[1];
    let castleBoxes = [];

    let threatBoxes = [];

    stepBoxes.forEach(stepBox => {
        stepBox.appendChild(piece);
        if (checkForCHECK()) {
            threatBoxes.push(stepBox);
        }
        box.appendChild(piece);
    })
    stepBoxes = stepBoxes.filter(item => !threatBoxes.includes(item));

    if (piece.name=="king") {
        castleBoxes = allBoxes[2];
        if (check) {
            stepBoxes = stepBoxes.filter(item => !castleBoxes.includes(item));
            castleBoxes = [];
        } 
        for (const castleBox of castleBoxes) {
            let passingBox;
            if (castleBox.id[1]=="3") {
                passingBox = document.getElementById(`${+castleBox.id+1}`);
            }else if (castleBox.id[1]=="7") {
                passingBox = document.getElementById(`${+castleBox.id-1}`);
            }
            if (!stepBoxes.includes(passingBox)) {
                stepBoxes = stepBoxes.filter(item => !castleBoxes.includes(item));
                castleBoxes = [];
            }
        } 
    }

    castleBoxes.forEach(castleBox => {
        castleBox.appendChild(piece);
        if (checkForCHECK()) {
            threatBoxes.push(castleBox);
        }
        box.appendChild(piece);
    })
    killBoxes.forEach(killBox => {
        let killPiece = killBox.querySelector("i");
        killPiece.remove();
        killBox.appendChild(piece);
        if (checkForCHECK()) {
            threatBoxes.push(killBox);
        }
        box.appendChild(piece);
        killBox.appendChild(killPiece);
    })

    castleBoxes = castleBoxes.filter(item => !threatBoxes.includes(item));
    killBoxes = killBoxes.filter(item => !threatBoxes.includes(item));
    return [stepBoxes, killBoxes, castleBoxes];
}