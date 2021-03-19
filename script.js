/*
* The class Player creates and instance of a player with a unique token that is represented by icon.  This
* token will be their piece on the Tic-Tac-Toe board.
* Parameters:
* name (optional) - the name of the player
* icon (optional) - the icon of the player
*/
class Player{
    constructor(name = null, icon = null) {
        this.icon = icon;
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
        this.htmlBoard= document.querySelector(".board"); // the html board div
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
        };// an object that's keys are the squares and values are an array that shows if the square is filled,
          // what icon is in the square, and a reference to the html object of the square
        this.player1 = null; // a player object
        this.player2 = null; // a player object
        this.first = null; // indicates who is going first in a round
        this.turn = null; // indicates whose turn it is
        this.filledBoxes = 0; // keeps track of how many boxes have been filled
        this.gameOver = false; // keeps track of when the game is over
        this.player1Wins = 0; // keeps track of how many times player 1 has won
        this.player2Wins = 0; // keeps track of how many times player 2 has won
    }

    /*
    * This method updates the board to to reflect the players chosen square and places either an
    * x  or an o in the space if it is available.
    * Parameters:
    * position - a string that is the name of the square that was clicked on.
    * Return Value: none
    */
    setSquare(position){
        if (!this.board[position][0] && !this.gameOver) { // places image if game is not over and square is not filled
            this.board[position][0] = true;
            this.board[position][1] = this.turn.icon;
            let image = document.createElement("img");
            image.setAttribute("src", `images/${this.turn.icon}.png`);
            this.board[position][2].appendChild(image);
            this.filledBoxes = this.filledBoxes + 1;
            if (this.filledBoxes === 1){ // if it is no the first turn of the game, the reset button is present
                let resetButton = document.querySelector(".reset-button");
                resetButton.style.display = "block";
            }
            let message = document.querySelector("#message");
            if (!this.checkForWinner()) { // if there is no winner, this.turn is change to the opposite player
                if (this.turn === this.player1) {
                    this.turn = this.player2;
                    message.textContent = "Player 2's Turn!"; // alerts the players whose turn it is
                } else if (this.turn === this.player2) {
                    this.turn = this.player1;
                    message.textContent = "Player 1's Turn!"; // alerts the players whose turn it is
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
        squares.forEach(square => square.addEventListener("click", (event) => {
            this.setSquare(square.id);
            event.preventDefault();
        })); // adds a listener to each square on the board
        let resetButton = document.querySelector(".reset-button");
        resetButton.addEventListener("click", (event)=> {
            this.clearBoard();
            event.preventDefault();
        }); // adds a listener to the reset button
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
        resetButton.style.display = "none"; // hides reset button
        for (let key in this.board){ // sets the board back to empty
            this.board[key][0] = false;
            this.board[key][1] = "";
            let image = this.htmlBoard.querySelector(`#${key} > img`);
            if (image !== null){ // removes each icon
                image.remove();
            }
            this.board[key][2].style.backgroundColor = "#E3C0D3"; // gets rid of winning background sequence
        }
        let message = document.querySelector("#message");
        if(this.first === this.player1 && this.gameOver){ // switches which player goes first and tells the user
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
        let player = this.turn.icon; // gets the icon of the player and the icon in each or the boxes on the board
        let topLeft = this.board.topLeft[1];
        let topCenter = this.board.topCenter[1];
        let topRight = this.board.topRight[1];
        let middleLeft = this.board.middleLeft[1];
        let middleCenter = this.board.middleCenter[1];
        let middleRight = this.board.middleRight[1];
        let bottomLeft = this.board.bottomLeft[1];
        let bottomCenter = this.board.bottomCenter[1];
        let bottomRight = this.board.bottomRight[1];

        if ((topLeft === topCenter) && (topCenter === topRight) && (topLeft === player)){ // checks top row
            this.reportWinner(["topLeft", "topCenter", "topRight"]);
        } else if ((middleLeft === middleCenter) && (middleCenter === middleRight) && (middleLeft === player)){ // checks middle row
            this.reportWinner(["middleLeft", "middleCenter", "middleRight"]);
        } else if ((bottomLeft === bottomCenter) && (bottomCenter === bottomRight) && (bottomLeft === player)){ // checks bottom row
            this.reportWinner(["bottomLeft", "bottomCenter", "bottomRight"]);
        } else if ((topLeft === middleLeft) && (middleLeft === bottomLeft) && (topLeft === player)){// checks left column
            this.reportWinner(["topLeft", "middleLeft", "bottomLeft"]);
        } else if ((topCenter === middleCenter) && (middleCenter === bottomCenter) && (topCenter === player)){ // checks middle column
            this.reportWinner(["topCenter", "middleCenter", "bottomCenter"]);
        } else if ((topRight === middleRight) && (middleRight === bottomRight) && (topRight === player )){ // checks right column
            this.reportWinner(["topRight", "middleRight", "bottomRight"]);
        } else if ((topLeft === middleCenter) && (middleCenter === bottomRight) && (topLeft === player)){ // checks top left to bottom right diagonal
            this.reportWinner(["topLeft", "middleCenter", "bottomRight"]);
        }else if ((bottomLeft === middleCenter) && (middleCenter === topRight) && (bottomLeft === player)){ // checks bottom left to top right diagonal
            this.reportWinner(["bottomLeft", "middleCenter", "topRight"]);
        }else if (this.filledBoxes === 9){ // checks if it's a tie
            this.reportWinner();
        }else{ // the game has not ended
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
        if (squares === null){ // reports a tie to the user
            message.textContent = "It's a tie! Play again??";
        }else{ // there is a winner!
            let winner;
            for(let i = 0; i < 3; i++){ // changes the background of the winning squares
                this.board[squares[i]][2].style.backgroundColor = "#FFC759";
            }
            if (this.turn === this.player1){ // alerts users player 1 wins and updates score
                winner = "Player 1";
                this.player1Wins = this.player1Wins + 1;
                let winnerScore = document.querySelector("#x-score > h1");
                winnerScore.textContent = this.player1Wins;
            }else{ // alerts users player 2 wins and updates score
                winner = "Player 2";
                this.player2Wins = this.player2Wins + 1;
                let winnerScore = document.querySelector("#o-score > h1");
                winnerScore.textContent = this.player2Wins;
            }
            message.textContent = `Congratulations ${winner}!! You Won!`;
        }
        let resetButton = document.querySelector(".reset-button");
        resetButton.textContent = "Play Again?" // changes reset button to say play again?
    }

    /*
    * This method calls the addListeners() method allowing the buttons to be activated
    * Parameters: none
    * Return Value: none
    */
    playGame(){
        this.addListeners();
    }

    /*
    * This method allows the user to choose their tokens. It presents the user with a modal
    * where they select their tokens and prevents them from choosing the same one.
    * Parameters: none
    * Return Value: none
    */
    choosePlayer(){
        let modal = document.querySelector("#character-modal");
        let modalButton  = document.querySelector(".character-button");
        let span = document.querySelector(".close");
        let choices = document.querySelector(".icon-grid").childNodes;
        let selectButton = document.querySelector(".confirm-character");
        let header = document.querySelector("#modal-title");
        let currentChoice = null; // the picture that is currently selected as the user's choice
        let player1 = new Player("Player 1");
        let player2 = new Player("Player 2");
        let player1Choice = true;
        let player2Choice = false;

        modalButton.addEventListener("click", (event) => { // opens the character selection modal
            modal.style.display = "block";
            event.preventDefault();
        });
        span.addEventListener("click", (event) => { // closes the character selection modal
            modal.style.display = "none";
            event.preventDefault();
        });
        // makes each of the images clickable
        choices.forEach((choice) => choice.addEventListener("click", (event) => {
            if (choice.id !== player1.icon) { // makes sure the selection of player 2 is not the same as player 1
                if (currentChoice !== null) { // when a new choice is chosen, the pink background is removed
                    currentChoice.style.background = "none";
                }
                currentChoice = choice;
                choice.style.background = "#E3C0D3"; // changes background to indicate which image is selected
                if (player1Choice) { // assigns the choice to the player choosing
                    player1.icon = choice.id;
                } else {
                    player2.icon = choice.id;
                }
                event.preventDefault();
            }
        }));
        selectButton.addEventListener("click", (event) => { // selects the currentChoice
            if (player2Choice){ // closes modal if both players have chosen
                this.player2 = player2; // assigns this.player2 to the local player 2
                modal.style.display = "none"; // closes modal
                modalButton.style.display = "none"; // removes character choice button
                this.turn = this.player1; // sets player 1 as the first player to take a turn
                this.first = this.player1;
                let message = document.querySelector("#message");
                message.textContent = "Player 1 Goes First!";
                this.playGame(); // activates the board
                event.preventDefault();
            }else{ // player 2 chooses
                this.player1 = player1; // assigns this.player1 to the local player1
                header.textContent = "Player 2: Choose Your Icon..."; // notifies user that it's player 2's turn to choose
                currentChoice.style.background = "#5a4a53"; // greys background of player 1 choice to show it can no longer be selected
                currentChoice = null;
                player1Choice = false;
                player2Choice = true;
            }
        })
    }
}
let game = new TicTacToeGame(); // create an instance of the game
game.choosePlayer(); // activates the interface
