
const pawnMoves = (id) => {
    const box = document.getElementById(`${id}`);
    const piece = box.querySelector("i");
    placeBoxes = [], killBoxes = [];
    let row = +id[0], col = +id[1];
    let n;
    if (piece.classList[2]=="iconB") {
        if (row==2) {
            n=2;
        }else if (row>2 && row<8) {
            n=1;
        }else {
            n=0;
        }
        for (i=1;i<=n;i++) {
            let newBoxId = `${row+i}${col}`;
            let newBox = document.getElementById(`${newBoxId}`);
            if (newBox.querySelector("i")) {
                break
            }
            placeBoxes.push(newBox);
        }
        if (n) {
            for (i=0;i<2;i++) {
                let newCol = col+2*i-1;
                if (newCol>=1 && newCol<=8) {
                    let newBoxId = `${row+1}${newCol}`;
                    let newBox = document.getElementById(`${newBoxId}`);
                    let newPiece = newBox.querySelector("i");
                    if (newPiece) {
                        if (newPiece.classList[2]=="iconW") {
                            killBoxes.push(newBox);
                        }
                    }
                }
            }
        }
        if (row==7) {
            promotionBoxes(placeBoxes, killBoxes);
        }
    }
    if (piece.classList[2]=="iconW") {
        if (row==7) {
            n=2;
        }else if (row>1 && row<7) {
            n=1;
        }else {
            n=0;
        }
        for (i=1;i<=n;i++) {
            let newBoxId = `${row-i}${col}`;
            let newBox = document.getElementById(`${newBoxId}`);
            if (newBox.querySelector("i")) {
                break
            }
            placeBoxes.push(newBox);
        }
        if (n) {
            for (i=0;i<2;i++) {
                let newCol = col+2*i-1;
                if (newCol>=1 && newCol<=8) {
                    let newBoxId = `${row-1}${newCol}`;
                    let newBox = document.getElementById(`${newBoxId}`);
                    let newPiece = newBox.querySelector("i");
                    if (newPiece) {
                        if (newPiece.classList[2]=="iconB") {
                            killBoxes.push(newBox);
                        }
                    }
                }
            }
        }
        if (row==2) {
            promotionBoxes(placeBoxes, killBoxes);
        }
    }
    return [placeBoxes, killBoxes];
}

const rookMoves = (id) => {
    const box = document.getElementById(`${id}`);
    const piece = box.querySelector("i");
    placeBoxes = [], killBoxes = [];
    let row = +id[0], col = +id[1];
        for (i=1;i<=8-col;i++) {
            let newBoxId = `${row}${col+i}`;
            let newBox = document.getElementById(`${newBoxId}`);
            let newPiece = newBox.querySelector("i");
            if (newPiece) {
                if (newPiece.classList[2]!=piece.classList[2]) {
                    killBoxes.push(newBox);
                }
                break
            }
            placeBoxes.push(newBox);
        }
        for (i=1;i<col;i++) {
            let newBoxId = `${row}${col-i}`;
            let newBox = document.getElementById(`${newBoxId}`);
            let newPiece = newBox.querySelector("i");
            if (newPiece) {
                if (newPiece.classList[2]!=piece.classList[2]) {
                    killBoxes.push(newBox);
                }
                break
            }
            placeBoxes.push(newBox);
        }
        for (i=1;i<=8-row;i++) {
            let newBoxId = `${row+i}${col}`;
            let newBox = document.getElementById(`${newBoxId}`);
            let newPiece = newBox.querySelector("i");
            if (newPiece) {
                if (newPiece.classList[2]!=piece.classList[2]) {
                    killBoxes.push(newBox);
                }
                break
            }
            placeBoxes.push(newBox);
        }
        for (i=1;i<row;i++) {
            let newBoxId = `${row-i}${col}`;
            let newBox = document.getElementById(`${newBoxId}`);
            let newPiece = newBox.querySelector("i");
            if (newPiece) {
                if (newPiece.classList[2]!=piece.classList[2]) {
                    killBoxes.push(newBox);
                }
                break
            }
            placeBoxes.push(newBox);
        }
    return [placeBoxes, killBoxes];
}

const knightMoves = (id) => {
    const box = document.getElementById(`${id}`);
    const piece = box.querySelector("i");
    placeBoxes = [], killBoxes = [];
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
                        if (newPiece.classList[2]!=piece.classList[2]) {
                            killBoxes.push(newBox);
                        }
                    }else {
                        placeBoxes.push(newBox);
                    }
                }
            }
        }
    return [placeBoxes, killBoxes];
}

const bishopMoves = (id) => {
    const box = document.getElementById(`${id}`);
    const piece = box.querySelector("i");
    placeBoxes = [], killBoxes = [];
    let row = +id[0], col = +id[1];
        while (row<=7 && col>1) {
            row += 1; col -= 1;
            let newBoxId = `${row}${col}`;
            let newBox = document.getElementById(`${newBoxId}`);
            let newPiece = newBox.querySelector("i");
            if (newPiece) {
                if (newPiece.classList[2]!=piece.classList[2]) {
                    killBoxes.push(newBox);
                }
                break
            }
            placeBoxes.push(newBox);
        }
    row = +id[0]; col = +id[1];
        while (row<=7 && col<=7) {
            row += 1; col += 1;
            let newBoxId = `${row}${col}`;
            let newBox = document.getElementById(`${newBoxId}`);
            let newPiece = newBox.querySelector("i");
            if (newPiece) {
                if (newPiece.classList[2]!=piece.classList[2]) {
                    killBoxes.push(newBox);
                }
                break
            }
            placeBoxes.push(newBox);
        }
    row = +id[0]; col = +id[1];
        while (row>1 && col<=7) {
            row -= 1; col += 1;
            let newBoxId = `${row}${col}`;
            let newBox = document.getElementById(`${newBoxId}`);
            let newPiece = newBox.querySelector("i");
            if (newPiece) {
                if (newPiece.classList[2]!=piece.classList[2]) {
                    killBoxes.push(newBox);
                }
                break
            }
            placeBoxes.push(newBox);
        }
    row = +id[0]; col = +id[1]; 
        while (row>1 && col>1) {
            row -= 1; col -= 1;
            let newBoxId = `${row}${col}`;
            let newBox = document.getElementById(`${newBoxId}`);
            let newPiece = newBox.querySelector("i");
            if (newPiece) {
                if (newPiece.classList[2]!=piece.classList[2]) {
                    killBoxes.push(newBox);
                }
                break
            }
            placeBoxes.push(newBox);
        }
    return [placeBoxes, killBoxes];
}

const kingMoves = (id) => {
    const box = document.getElementById(`${id}`);
    const piece = box.querySelector("i");
    placeBoxes = [], killBoxes = [], castleBoxes = [];
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
                            if (newPiece.classList[2]!=piece.classList[2]) {
                                killBoxes.push(newBox);
                            }
                        }else {
                            placeBoxes.push(newBox);
                        }
                    }
                }
            }
        }
        if (whitesTurn && !kingWDisturbed && !rookRWDisturbed) {
            let nextBox1 = document.getElementById("86");
            let nextBox2 = document.getElementById("87");
            let nextPiece1 = nextBox1.querySelector("i");
            let nextPiece2 = nextBox2.querySelector("i");
            if (!nextPiece1 && !nextPiece2) {
                castleBoxes.push(nextBox2);
            }
        }
        if (whitesTurn && !kingWDisturbed && !rookLWDisturbed) {
            let nextBox1 = document.getElementById("84");
            let nextBox2 = document.getElementById("83");
            let nextBox3 = document.getElementById("82");
            let nextPiece1 = nextBox1.querySelector("i");
            let nextPiece2 = nextBox2.querySelector("i");
            let nextPiece3 = nextBox3.querySelector("i");
            if (!nextPiece1 && !nextPiece2 && !nextPiece3) {
                castleBoxes.push(nextBox2);
            }
        }

        if (!whitesTurn && !kingWDisturbed && !rookRBDisturbed) {
            let nextBox1 = document.getElementById("16");
            let nextBox2 = document.getElementById("17");
            let nextPiece1 = nextBox1.querySelector("i");
            let nextPiece2 = nextBox2.querySelector("i");
            if (!nextPiece1 && !nextPiece2) {
                castleBoxes.push(nextBox2);
            }
        }
        if (!whitesTurn && !kingWDisturbed && !rookLBDisturbed) {
            let nextBox1 = document.getElementById("14");
            let nextBox2 = document.getElementById("13");
            let nextBox3 = document.getElementById("12");
            let nextPiece1 = nextBox1.querySelector("i");
            let nextPiece2 = nextBox2.querySelector("i");
            let nextPiece3 = nextBox3.querySelector("i");
            if (!nextPiece1 && !nextPiece2 && !nextPiece3) {
                castleBoxes.push(nextBox2);
            }
        }
    return [placeBoxes, killBoxes, castleBoxes];
}

