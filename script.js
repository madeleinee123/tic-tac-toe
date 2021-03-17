class Piece{
    constructor(type) {
        this.type = type;
    }
    getType(){
        return this.type;
    }
}
class Board{
    constructor(){
        this.board= {
            topLeft: [false, ""],
            topCenter: [false, ""],
            topRight: [false, ""],
            middleLeft: [false, ""],
            middleCenter: [false, ""],
            middleRight: [false, ""],
            bottomLeft: [false, ""],
            bottomCenter: [false, ""],
            bottomRight: [false, ""]
        }
    }
    setTopLeft(piece){
        
    }
}
