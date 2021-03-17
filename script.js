class Board{
    constructor(){
        this.htmlBoard= document.querySelector(".board");
        this.board= {
            topLeft: [false, "", this.htmlBoard.querySelector("#topLeft > img")],
            topCenter: [false, "", this.htmlBoard.querySelector("#topCenter > img")],
            topRight: [false, "", this.htmlBoard.querySelector("#topRight > img")],
            middleLeft: [false, "", this.htmlBoard.querySelector("#middleLeft > img")],
            middleCenter: [false, "", this.htmlBoard.querySelector("#middleCenter > img")],
            middleRight: [false, "", this.htmlBoard.querySelector("#middleRight > img")],
            bottomLeft: [false, "", this.htmlBoard.querySelector("#bottomLeft > img")],
            bottomCenter: [false, "", this.htmlBoard.querySelector("#bottomCenter > img")],
            bottomRight: [false, "", this.htmlBoard.querySelector("#bottomRight > img")]
        }
        this.turn = "x";
    }
    setSquare(position){

        if (!this.board[position][0]){
            this.board[position][0] = true;
            this.board[position][1] = this.turn;
            this.board[position][2].setAttribute("src", `images/${this.turn}.png`);
        }
    }
    addListeners(){
        this.htmlBoard.childNodes.forEach(div => div.addEventListener("click", (event) => {
            this.setSquare(div.id);
            event.preventDefault();
        }))
    }
    clearBoard(){
        for (let key in this.board){
            key[0] = false;
            key[1] = "";
            key[2].setAttribute("src", "");
        }
    }
}
class TicTacToeGame{
    constructor() {
        this.player1 = "x";
        this.player2 = "o";
        this.player1Pieces = 5;
        this.player2Pieces = 4
        this.turn = "player 1";
        this.board = new Board();
    }
    playGame(){
        this.board.addListeners();
        //while(this.player1Pieces > 0 && this.player2Pieces > 0){
    }

}
let game = new TicTacToeGame();
game.playGame();
