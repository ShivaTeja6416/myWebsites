
const pawnMoves = (id) => {
    const box = document.getElementById(`${id}`);
    const piece = box.querySelector("i");
    stepBoxes = [], killBoxes = [];
    let row = +id[0], col = +id[1];
    let n;
    if (piece.color=="black") {
        if (row==2) {
            n=2;
        }else if (row>2 && row<8) {
            n=1;
        }
        for (i=1;i<=n;i++) {
            let newBoxId = `${row+i}${col}`;
            let newBox = document.getElementById(`${newBoxId}`);
            if (newBox.querySelector("i")) {
                break
            }
            stepBoxes.push(newBox);
        }
        for (i=0;i<2;i++) {
            let newCol = col+2*i-1;
            if (newCol>=1 && newCol<=8) {
                let newBoxId = `${row+1}${newCol}`;
                let newBox = document.getElementById(`${newBoxId}`);
                let newPiece = newBox.querySelector("i");
                if (newPiece) {
                    if (newPiece.color=="white") {
                        killBoxes.push(newBox);
                    }
                }
            }
        }
    }
    if (piece.color=="white") {
        if (row==7) {
            n=2;
        }else if (row>1 && row<7) {
            n=1;
        }
        for (i=1;i<=n;i++) {
            let newBoxId = `${row-i}${col}`;
            let newBox = document.getElementById(`${newBoxId}`);
            if (newBox.querySelector("i")) {
                break
            }
            stepBoxes.push(newBox);
        }
        for (i=0;i<2;i++) {
            let newCol = col+2*i-1;
            if (newCol>=1 && newCol<=8) {
                let newBoxId = `${row-1}${newCol}`;
                let newBox = document.getElementById(`${newBoxId}`);
                let newPiece = newBox.querySelector("i");
                if (newPiece) {
                    if (newPiece.color=="black") {
                        killBoxes.push(newBox);
                    }
                }
            }
        }
    }
    return [stepBoxes, killBoxes];
}

const rookMoves = (id) => {
    const box = document.getElementById(`${id}`);
    const piece = box.querySelector("i");
    stepBoxes = [], killBoxes = [];
    let row = +id[0], col = +id[1];
        for (i=1;i<=8-col;i++) {
            let newBoxId = `${row}${col+i}`;
            let newBox = document.getElementById(`${newBoxId}`);
            let newPiece = newBox.querySelector("i");
            if (newPiece) {
                if (newPiece.color!=piece.color) {
                    killBoxes.push(newBox);
                }
                break
            }
            stepBoxes.push(newBox);
        }
        for (i=1;i<col;i++) {
            let newBoxId = `${row}${col-i}`;
            let newBox = document.getElementById(`${newBoxId}`);
            let newPiece = newBox.querySelector("i");
            if (newPiece) {
                if (newPiece.color!=piece.color) {
                    killBoxes.push(newBox);
                }
                break
            }
            stepBoxes.push(newBox);
        }
        for (i=1;i<=8-row;i++) {
            let newBoxId = `${row+i}${col}`;
            let newBox = document.getElementById(`${newBoxId}`);
            let newPiece = newBox.querySelector("i");
            if (newPiece) {
                if (newPiece.color!=piece.color) {
                    killBoxes.push(newBox);
                }
                break
            }
            stepBoxes.push(newBox);
        }
        for (i=1;i<row;i++) {
            let newBoxId = `${row-i}${col}`;
            let newBox = document.getElementById(`${newBoxId}`);
            let newPiece = newBox.querySelector("i");
            if (newPiece) {
                if (newPiece.color!=piece.color) {
                    killBoxes.push(newBox);
                }
                break
            }
            stepBoxes.push(newBox);
        }
    return [stepBoxes, killBoxes];
}

const knightMoves = (id) => {
    const box = document.getElementById(`${id}`);
    const piece = box.querySelector("i");
    stepBoxes = [], killBoxes = [];
    let row = +id[0], col = +id[1];
        for (i=1;i<=2;i++) {
            for (j=1;j<=4;j++) {
                let newRow = row+(2*i-3)*(2-j%2);
                let newCol = col+(j%2+1)*(2%j-1);
                if (newRow>0 && newRow<=8 && newCol>0 && newCol<=8) {
                    let newBoxId = `${newRow}${newCol}`;
                    let newBox = document.getElementById(`${newBoxId}`);
                    let newPiece = newBox.querySelector("i");
                    if (newPiece) {
                        if (newPiece.color!=piece.color) {
                            killBoxes.push(newBox);
                        }
                    }else {
                        stepBoxes.push(newBox);
                    }
                }
            }
        }
    return [stepBoxes, killBoxes];
}

const bishopMoves = (id) => {
    const box = document.getElementById(`${id}`);
    const piece = box.querySelector("i");
    stepBoxes = [], killBoxes = [];
    let row = +id[0], col = +id[1];
        while (row<=7 && col>1) {
            row += 1; col -= 1;
            let newBoxId = `${row}${col}`;
            let newBox = document.getElementById(`${newBoxId}`);
            let newPiece = newBox.querySelector("i");
            if (newPiece) {
                if (newPiece.color!=piece.color) {
                    killBoxes.push(newBox);
                }
                break
            }
            stepBoxes.push(newBox);
        }
    row = +id[0]; col = +id[1];
        while (row<=7 && col<=7) {
            row += 1; col += 1;
            let newBoxId = `${row}${col}`;
            let newBox = document.getElementById(`${newBoxId}`);
            let newPiece = newBox.querySelector("i");
            if (newPiece) {
                if (newPiece.color!=piece.color) {
                    killBoxes.push(newBox);
                }
                break
            }
            stepBoxes.push(newBox);
        }
    row = +id[0]; col = +id[1];
        while (row>1 && col<=7) {
            row -= 1; col += 1;
            let newBoxId = `${row}${col}`;
            let newBox = document.getElementById(`${newBoxId}`);
            let newPiece = newBox.querySelector("i");
            if (newPiece) {
                if (newPiece.color!=piece.color) {
                    killBoxes.push(newBox);
                }
                break
            }
            stepBoxes.push(newBox);
        }
    row = +id[0]; col = +id[1]; 
        while (row>1 && col>1) {
            row -= 1; col -= 1;
            let newBoxId = `${row}${col}`;
            let newBox = document.getElementById(`${newBoxId}`);
            let newPiece = newBox.querySelector("i");
            if (newPiece) {
                if (newPiece.color!=piece.color) {
                    killBoxes.push(newBox);
                }
                break
            }
            stepBoxes.push(newBox);
        }
    return [stepBoxes, killBoxes];
}

const kingMoves = (id) => {
    const box = document.getElementById(`${id}`);
    const piece = box.querySelector("i");
    stepBoxes = [], killBoxes = [], castleBoxes = [];
    let row = +id[0], col = +id[1];
        for (i=1;i<=2;i++) {
            for (j=1;j<=2;j++) {
                for (k=1;k<=2;k++) {
                    let newRow = row+(((2%(i+j))/2)*(2*k-3));
                    let newCol = col+(parseInt((7-i-j)/4))*(3-2*i)*(2*k-3);
                    if (newRow>0 && newRow<=8 && newCol>0 && newCol<=8) {
                        let newBoxId = `${newRow}${newCol}`;
                        let newBox = document.getElementById(`${newBoxId}`);
                        let newPiece = newBox.querySelector("i");
                        if (newPiece) {
                            if (newPiece.color!=piece.color) {
                                killBoxes.push(newBox);
                            }
                        }else {
                            stepBoxes.push(newBox);
                        }
                    }
                }
            }
        }
        if (whitesTurn && !disturbedCastlingPieces.includes("kingW")) {
            for (i=0;i<2;i++) {
                if (!disturbedCastlingPieces.includes(castlingPieces[3+i])) {
                    let spaceToCastle = true;
                    let n = Number(castlingPieceBoxes[3+i])-Number(castlingPieceBoxes[5]);
                    for (j=1;j<(Math.abs(n));j++) {
                        let nextBox = document.getElementById(`${85+(Math.sign(n))*j}`);
                        if (nextBox.querySelector(".fa-solid")) {
                            spaceToCastle = false;
                        }
                    }
                    if (spaceToCastle) {
                        let castleBox = document.getElementById(`${85+(Math.sign(n))*2}`);
                        castleBoxes.push(castleBox);
                        stepBoxes.push(castleBox);
                    }
                }
            }
        }
        if (!whitesTurn && !disturbedCastlingPieces.includes("kingB")) {
            for (i=0;i<2;i++) {
                if (!disturbedCastlingPieces.includes(castlingPieces[i])) {
                    let spaceToCastle = true;
                    let n = Number(castlingPieceBoxes[i])-Number(castlingPieceBoxes[2]);
                    for (j=1;j<(Math.abs(n));j++) {
                        let nextBox = document.getElementById(`${15+(Math.sign(n))*j}`);
                        if (nextBox.querySelector(".fa-solid")) {
                            spaceToCastle = false;
                        }
                    }
                    if (spaceToCastle) {
                        let castleBox = document.getElementById(`${15+(Math.sign(n))*2}`);
                        castleBoxes.push(castleBox);
                        stepBoxes.push(castleBox);
                    }
                }
            }
        }
    return [stepBoxes, killBoxes, castleBoxes];
}

