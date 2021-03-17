class Board{
    constructor(){
        this.htmlBoard= document.querySelector(".board");
        this.board= {
            topLeft: [false, "", this.htmlBoard.querySelector("#topLeft")],
            topCenter: [false, "", this.htmlBoard.querySelector("#topCenter")],
            topRight: [false, "", this.htmlBoard.querySelector("#topRight")],
            middleLeft: [false, "", this.htmlBoard.querySelector("#middleLeft")],
            middleCenter: [false, "", this.htmlBoard.querySelector("#middleCenter")],
            middleRight: [false, "", this.htmlBoard.querySelector("#middleRight")],
            bottomLeft: [false, "", this.htmlBoard.querySelector("#bottomLeft")],
            bottomCenter: [false, "", this.htmlBoard.querySelector("#bottomCenter")],
            bottomRight: [false, "", this.htmlBoard.querySelector("#bottomRight")]
        }
        this.turn = "x";
        this.openBoxes = 9;
        this.gameOver = false;
    }
    setSquare(position){
        if (!this.board[position][0] && !this.gameOver) {
            this.board[position][0] = true;
            this.board[position][1] = this.turn;
            let image = document.createElement("img");
            image.setAttribute("src", `images/${this.turn}.png`);
            this.board[position][2].appendChild(image);
            this.openBoxes = this.openBoxes - 1;
            if (!this.checkForWinner()) {
                if (this.turn === "x") {
                    this.turn = "o";
                } else if (this.turn === "o") {
                    this.turn = "x";
                }
            }
        }
    }
    addListeners(){
        let squares = this.htmlBoard.querySelectorAll(".square")
        squares.forEach(div => div.addEventListener("click", (event) => {
            this.setSquare(div.id);
            event.preventDefault();
        }))
    }
    clearBoard(){
        this.htmlBoard.querySelector(".reset-button").textContent = "Reset";
        for (let key in this.board){
            this.board[key][0] = false;
            this.board[key][1] = "";
            let image = this.htmlBoard.querySelector(`#${key} > img`);
            if (image !== null){
                image.remove();
            }
            let message = document.querySelector("#message");
            if (message !== null){
                message.remove();
            }
            this.board[key][2].style.backgroundColor = "#E3C0D3";
        }
        this.turn = "x";
        this.openBoxes = 9;
        this.gameOver = false;
    }
    checkForWinner(){
        let player = this.turn;
        let topLeft = this.board.topLeft[1];
        let topCenter = this.board.topCenter[1];
        let topRight = this.board.topRight[1];
        let middleLeft = this.board.middleLeft[1];
        let middleCenter = this.board.middleCenter[1];
        let middleRight = this.board.middleRight[1];
        let bottomLeft = this.board.bottomLeft[1];
        let bottomCenter = this.board.bottomCenter[1];
        let bottomRight = this.board.bottomRight[1];

        if ((topLeft === topCenter) && (topCenter === topRight) && (topLeft === player)){
            this.reportWinner(["topLeft", "topCenter", "topRight"]);
        } else if ((middleLeft === middleCenter) && (middleCenter === middleRight) && (middleLeft === player)){
            this.reportWinner(["middleLeft", "middleCenter", "middleRight"]);
        } else if ((bottomLeft === bottomCenter) && (bottomCenter === bottomRight) && (bottomLeft === player)){
            this.reportWinner(["bottomLeft", "bottomCenter", "bottomRight"]);
        } else if ((topLeft === middleLeft) && (middleLeft === bottomLeft) && (topLeft === player)){
            this.reportWinner(["topLeft", "middleLeft", "bottomLeft"]);
        } else if ((topCenter === middleCenter) && (middleCenter === bottomCenter) && (topCenter === player)){
            this.reportWinner(["topCenter", "middleCenter", "bottomCenter"]);
        } else if ((topRight === middleRight) && (middleRight === bottomRight) && (topRight === player )){
            this.reportWinner(["topRight", "middleRight", "bottomRight"]);
        } else if ((topLeft === middleCenter) && (middleCenter === bottomRight) && (topLeft === player)){
            this.reportWinner(["topLeft", "middleCenter", "bottomRight"]);
        }else if ((bottomLeft === middleCenter) && (middleCenter === topRight) && (bottomLeft === player)){
            this.reportWinner(["bottomLeft", "middleCenter", "topRight"]);
        }else if (this.openBoxes < 1){
            this.reportWinner("tie");
        }else{
            return false;
        }
    }
    reportWinner(squares){
        this.gameOver = true;
        let message = document.createElement("h2");
        message.setAttribute("id", "message");
        if (squares === "tie"){
            message.textContent = "It's a tie! Play again??";
        }else{
            let winner;
            for(let i = 0; i < 3; i++){
                this.board[squares[i]][2].style.backgroundColor = "#FFC759";
            }
            if (this.turn === "x"){
                winner = "Player 1"
            }else{
                winner = "Player 2"
            }
            message.textContent = `Congratulations ${winner}!! You Won!`;
        }
        let resetButton = document.querySelector(".reset-button");
        resetButton.textContent = "Play Again?"
        let infoBox = document.querySelector("#info");
        infoBox.prepend(message);
    }
}
class TicTacToeGame{
    constructor() {
        this.board = new Board();
    }
    playGame(){
        let resetButton = document.querySelector(".reset-button");
        resetButton.addEventListener("click", (event)=> {
            this.board.clearBoard();
            event.preventDefault();
        })
        this.board.addListeners();
    }
}
let game = new TicTacToeGame();
game.playGame();
