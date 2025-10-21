
const borderBox = document.querySelector("#border-box");
const gameBoard = document.querySelector("#game-board");
const modal = document.querySelector(".promotion-modal");
const whitesCaptured = document.querySelector(".left-panel .upper .whites-captured");
const blacksCaptured = document.querySelector(".left-panel .lower .blacks-captured");

const pieces = ["rook", "knight", "bishop", "queen", "king","pawn"];
const alpha = ["a", "b", "c", "d"]

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
let whitesTurn = true;
let rookLBDisturbed = false, rookRBDisturbed = false, rookLWDisturbed = false, rookRWDisturbed = false, 
    kingBDisturbed = false, kingWDisturbed = false;
const reArrange = () => {
    whitesTurn = true;
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

const addDotsAndShade = (clickedBox, placeBoxes, killBoxes) => {
    if (placeBoxes.length || killBoxes.length) {
        clickedBox.classList.add("glow");
    }else {
        clickedBox.classList.add("grey");
    }
    placeBoxes.forEach(placeBox => {
        let dot = document.createElement("div");
        dot.classList.add("dot");
        placeBox.appendChild(dot);
        placeBox.classList.add("select");
    })
    killBoxes.forEach(killBox => {
        killBox.classList.add("red-shade", "select");
    })
}
const promotionBoxes = (placeBoxes, killBoxes) => {
    placeBoxes.forEach(placeBox => {
        placeBox.classList.add("promotion-glow", "select");
    })
    killBoxes.forEach(killBox => {
        killBox.classList.add("promotion-glow", "kill-box", "select");
    })
}
const remDotsAndShade = () => {
    boxes.forEach(box => {
        if (box.classList.contains("glow")) {
            box.classList.remove("glow");
        }else if (box.classList.contains("grey")) {
            box.classList.remove("grey");
        }else if (box.querySelector(".dot")) {
            box.querySelector(".dot").remove();
            box.classList.remove("select");
        }else if (box.classList.contains("red-shade")) {
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

const updateKillCount = (killedPiece) => {
    killedPiece.remove();
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

// const threatToKingBoxes = () => {
//     if (!whitesTurn) {
//         activeBoxes = getWhitePieceBoxes();
//     }else {
//         activeBoxes = getBlackPieceBoxes();
//     }
//     let placeBoxes = [];
//     activeBoxes.forEach(box => {
//         placeBoxes = placeBoxes.concat(getPieceMoves(box)[0]);
//     })
// }

const enableMoves = (box,activeBoxes) => {
    remDotsAndShade();
    if (movesController) {
        movesController.abort();
    }
    const piece = box.querySelector("i");
    let allBoxes = getPieceMoves(box);
    let placeBoxes = allBoxes[0];
    let killBoxes = allBoxes[1];
    let castleBoxes;
    if (piece.name == "king") {
        castleBoxes = allBoxes[2];
    }else {
        castleBoxes = [];
    }
    addDotsAndShade(box, placeBoxes, killBoxes);
    movesController = new AbortController();
    placeBoxes.forEach(placeBox => {
        placeBox.addEventListener("click",evt => {movePiece(activeBoxes,box,piece,placeBox)}, {signal: movesController.signal});
    })
    killBoxes.forEach(killBox => {
        let killPiece = killBox.querySelector("i")
        killBox.addEventListener("click",evt => {movePiece(activeBoxes,box,piece,killBox,killPiece)}, {signal: movesController.signal});
    })
    castleBoxes.forEach(castleBox => {
        castleBox.classList.add("castle-glow", "select");
        castleBox.addEventListener("click",evt => {castle(activeBoxes,castleBox)}, {signal: movesController.signal});
    })
}

let selectionController, movesController, threatBoxes;
const selectPiece = ()=> {
    let activeBoxes;
    if (whitesTurn) {
        activeBoxes = getWhitePieceBoxes();
    }else {
        activeBoxes = getBlackPieceBoxes();
    }
    selectionController = new AbortController();
    activeBoxes.forEach(box => {
        box.classList.add("active");
        box.addEventListener("click",(evt) => {enableMoves(box,activeBoxes)}, {signal: selectionController.signal});
    })
}
selectPiece();

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
        }else {
            promotionPiece.classList.add("fa-solid", `fa-chess-${pieces[i]}`, "iconB");
            promotionPiece.name = pieces[i];
            promotionPiece.color = "black";
        }
        box.appendChild(promotionPiece);
        modal.appendChild(box);
    }
    let boxes = document.querySelectorAll(".promotion-piece-boxes");
    boxes.forEach(box => {
        box.addEventListener("click", () => {
            let selectedPiece = box.querySelector("i");
            piece.remove();
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

const movePiece = (activeBoxes,box,piece,newBox,killPiece) => {
    activeBoxes.forEach(box => {
        box.classList.remove("active");
    })
    if (box.id=="11") {
        rookLBDisturbed = true;
    }else if (box.id=="18") {
        rookRBDisturbed = true;
    }else if (box.id=="81") {
        rookLWDisturbed = true;
    }else if (box.id=="88") {
        rookRWDisturbed = true;
    }else if (box.id=="15") {
        kingBDisturbed = true;
    }else if (box.id=="85") {
        kingWDisturbed = true;
    }

    if (killPiece) {
        updateKillCount(killPiece);
    }
    newBox.appendChild(piece);
    selectionController.abort();
    movesController.abort();
    if (newBox.classList.contains("promotion-glow")) {
        remDotsAndShade();
        promotionModal(newBox,piece);
    }else {
        remDotsAndShade();
        whitesTurn = !whitesTurn;
        if (!whitesTurn) {
            borderBox.classList.add("black");
        }else {
            borderBox.classList.remove("black");
        }
        selectPiece();
    }2
}

const castle = (activeBoxes, box) => {
    activeBoxes.forEach(box => {
        box.classList.remove("active");
    })
    if (box.id=="87") {
        box.appendChild(piecesW[4]);
        let rookBox = document.getElementById("86");
        rookBox.appendChild(piecesW[7]);
    }else if (box.id=="83") {
        box.appendChild(piecesW[4]);
        let rookBox = document.getElementById("84");
        rookBox.appendChild(piecesW[0]);
    }else if (box.id=="17") {
        box.appendChild(piecesB[4]);
        let rookBox = document.getElementById("16");
        rookBox.appendChild(piecesB[7]);
    }else if (box.id=="13") {
        box.appendChild(piecesB[4]);
        let rookBox = document.getElementById("14");
        rookBox.appendChild(piecesB[0]);
    }
    selectionController.abort();
    movesController.abort();
    remDotsAndShade();
    whitesTurn = !whitesTurn;
    if (!whitesTurn) {
        borderBox.classList.add("black");
    }else {
        borderBox.classList.remove("black");
    }
    selectPiece();
}