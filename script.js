class Player{
    constructor(name = null, icon = null) {
        this.icon = icon;
        this.name = name;
    }
    setIcon(fileName){
        this.icon = fileName;
    }
    setName(name){
        this.name = name;
    }
}

/*
* The class TicTacToeGame allows two users to play tic-tac-toe against each other.  It keeps track of the score over
* multiple games and interacts with the user.
* Parameters: none
*/
class TicTacToeGame{

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
        this.player1 = null;
        this.player2 = null;
        this.first = null;
        this.turn = null;
        this.filledBoxes = 0;
        this.gameOver = false;
        this.player1Wins = 0;
        this.player2Wins = 0;
    }

    /*
    * This method updates the board to to reflect the players chosen square and places either an
    * x  or an o in the space if it is available.
    * Parameters:
    * position - a string that is the name of the square that was clicked on.
    * Return Value: none
    */
    setSquare(position){
        if (!this.board[position][0] && !this.gameOver) {
            this.board[position][0] = true;
            this.board[position][1] = this.turn.icon;
            let image = document.createElement("img");
            image.setAttribute("src", `images/${this.turn.icon}.png`);
            this.board[position][2].appendChild(image);
            this.filledBoxes = this.filledBoxes + 1;
            if (this.filledBoxes === 1){
                let resetButton = document.querySelector(".reset-button");
                resetButton.style.display = "block";
            }
            let message = document.querySelector("#message");
            if (!this.checkForWinner()) {
                if (this.turn === this.player1) {
                    this.turn = this.player2;
                    console.log("here i am!");
                    message.textContent = "Player 2's Turn!";
                } else if (this.turn === this.player2) {
                    console.log("here i am again!");
                    this.turn = this.player1;
                    message.textContent = "Player 1's Turn!"
                }
            }
        }
    }

    /*
    * This method adds all the event listeners to the clickable spaces on the web application.
    * Parameters: none
    * Return Value: none
    */
    addListeners(){
        let squares = this.htmlBoard.querySelectorAll("[type = tic-tac-toe-square]");
        console.log(squares);
        squares.forEach(square => square.addEventListener("click", (event) => {
            this.setSquare(square.id);
            event.preventDefault();
        }))
        let resetButton = document.querySelector(".reset-button");
        resetButton.addEventListener("click", (event)=> {
            this.clearBoard();
            event.preventDefault();
        })
    }

    /*
    * This method is called whenever the user clicks the reset or play again? button.  It sets all this.board,
    * this.filledBoxes, and this.gameOver back to their original states.  It also switches the player that goes first
    * to the opposite of the previous game and updates the score boxes to reflect who won in the previous round.
    * Parameters: none
    * Return Value: none
    */
    clearBoard(){
        let resetButton = this.htmlBoard.querySelector(".reset-button");
        resetButton.textContent = "Reset";
        resetButton.style.display = "none";
        for (let key in this.board){
            this.board[key][0] = false;
            this.board[key][1] = "";
            let image = this.htmlBoard.querySelector(`#${key} > img`);
            if (image !== null){
                image.remove();
            }
            this.board[key][2].style.backgroundColor = "#E3C0D3";
        }
        let message = document.querySelector("#message");
        if(this.first === this.player1 && this.gameOver){
            this.turn = this.player2;
            message.textContent = "Player 2 Goes First!!";
            this.first = this.player2;
        }else if (this.first === this.player2 && this.gameOver){
            this.turn = this.player1;
            message.textContent = "Player 1 Goes First!!";
            this.first = this.player1;
        }
        this.filledBoxes = 0;
        this.gameOver = false;
    }

    /*
    * This method is called after every turn.  It iterates through the board and checks to see if there are
    * any winning combinations.
    * Parameters: none
    * Return Value:
    * false - if no winning sequence is found and there are still empty squares otherwise it calls reportWinner and
    *         returns nothing.
    */
    checkForWinner(){
        let player = this.turn.icon;
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
        }else if (this.filledBoxes === 9){
            this.reportWinner();
        }else{
            return false;
        }
        return true;
    }

    /*
    * This method alerts the user of if the game was a tie, if X's won or if O's won. It also marks the
    * game as over so the user can no longer interact with the squares of the TicTacToe Board.
    * Parameters:
    * squares (optional) - list of names of the squares that are in the winning combination on the board
    *                      if no parameter is passed in than the game is a tie
    * Return Value: none
    */
    reportWinner(squares = null){
        this.gameOver = true;
        let message = document.querySelector("#message");
        console.log(message);
        if (squares === null){
            message.textContent = "It's a tie! Play again??";
            console.log(message);
        }else{
            let winner;
            for(let i = 0; i < 3; i++){
                this.board[squares[i]][2].style.backgroundColor = "#FFC759";
            }
            if (this.turn === this.player1){
                winner = "Player 1";
                this.player1Wins = this.player1Wins + 1;
                let winnerScore = document.querySelector("#x-score > h1");
                winnerScore.textContent = this.player1Wins;
            }else{
                winner = "Player 2";
                this.player2Wins = this.player2Wins + 1;
                let winnerScore = document.querySelector("#o-score > h1");
                winnerScore.textContent = this.player2Wins;
            }
            message.textContent = `Congratulations ${winner}!! You Won!`;
        }
        let resetButton = document.querySelector(".reset-button");
        resetButton.textContent = "Play Again?"
    }

    /*
    * This method calls the addListeners() method allowing the buttons to be activated
    * Parameters: none
    * Return Value: none
    */
    playGame(){
        console.log(this.turn);
        console.log(this.first);
        this.addListeners();
    }

    choosePlayer(){
        let modal = document.querySelector("#character-modal");
        let button  = document.querySelector(".character-button");
        let span = document.querySelector(".close");
        let choices = document.querySelector(".icon-grid").childNodes;
        let selectButton = document.querySelector(".confirm-character");
        let header = document.querySelector("#modal-title");
        let currentChoice = null;
        let player1 = new Player("Player 1");
        let player2 = new Player("Player 2");
        let player1Choice = true;
        let player2Choice = false;

        button.addEventListener("click", (event) => {
            modal.style.display = "block";
            event.preventDefault();
        });
        span.addEventListener("click", (event) => {
            modal.style.display = "none";
            event.preventDefault();
        });
        choices.forEach((choice) => choice.addEventListener("click", (event) => {

            if (currentChoice !== null){
                currentChoice.style.background = "none";
            }
            currentChoice = choice;
            choice.style.background = "#E3C0D3";
            if (player1Choice){
                player1.icon  = choice.id;
            }else{
                player2.icon = choice.id;
            }
            event.preventDefault();
        }))
        selectButton.addEventListener("click", (event) => {
            if (player2Choice){
                this.player2 = player2;
                modal.style.display = "none";
                event.preventDefault();
                button.style.display = "none";
                this.turn = this.player1;
                this.first = this.player1;
                let message = document.querySelector("#message");
                message.textContent = "Player 1 Goes First!"
                this.playGame();

            }else{
                this.player1 = player1;
                header.textContent = "Player 2: Choose Your Icon..."
                currentChoice.style.background = "#5a4a53"
                player1Choice = false;
                player2Choice = true;
            }
        })
    }
}
let game = new TicTacToeGame(); // create an instance of the game
game.choosePlayer(); // activates the interface
