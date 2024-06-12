import { Gameboard } from "./gameboardFactory";

class Bot {
    constructor() {
        this.gameboard = this.#createGameboard()
    }

    #createGameboard() {
        let newGameboard = new Gameboard();
        return newGameboard
    }

    checkValidPlacement( x , y , isRotated , ship) {
        let board = this.gameboard.gameboard
        const numRows = board.length
        const numCols = board[0].length
        const shipLength = ship.length

        if(board[x][y] !== null){
            return false
        }

        // check vertical placement
        if(isRotated){
            if(x + shipLength > numRows ){
                return false
            }

            for ( let i = 0 ; i < shipLength ; i++ ) {
                if(board[ x + i ] [ y ] !== null) {
                    return false
                }
            }
        } else {
            //check horizontal placement
            if( y + ship.length > numCols){
                return false
            }

            for ( let i = 0 ; i < shipLength ; i++){
                if(board[ x ][ y + i ] !== null){
                    return false
                }
            }
        }
        //ship can be placed
        return true 
    }

    randomNumber() {
        return Math.round(Math.random()*9)
    } 

    placeBotShips() {

        let ships = {
            carrier: this.gameboard.carrier,
            battleship: this.gameboard.battleship,
            destroyer: this.gameboard.destroyer,
            submarine: this.gameboard.submarine,
            patrol: this.gameboard.patrol
        }

        let shipKeys = Object.keys(ships)
        
        for (let j = 0 ; j < shipKeys.length ; j++ ) {
            let placed = false;
            while (!placed) {
                const x = Math.round(Math.random()*9)
                const y = Math.round(Math.random()*9)
                const isRotated = Math.random() < 0.5


                if(this.checkValidPlacement(x , y , isRotated, ships[shipKeys[j]])){
                    let shipLen = ships[shipKeys[j]].length
                
                    if(isRotated) {
                        for ( let i = 0 ; i < shipLen  ; i++){
                            this.gameboard.placeShip(x + i , y , shipKeys[j])
                        }    
                        placed = true
                    } else {
                        for ( let i = 0 ; i < shipLen  ; i++){
                            this.gameboard.placeShip(x , y + i , shipKeys[j])
                        }
                        placed = true
                    }  
                }                
            }
        }
    }



    attackPlayer( player ) {
        let x,y,attackMessage;

        do {
            x = this.randomNumber();
            y = this.randomNumber();
            [attackMessage] = player.gameboard.receiveInput(x, y);
        } while (attackMessage === "not a valid attack");
        
        console.log("x is " + x, "y is " + y);
        return [attackMessage, x , y];
    }

}

export {Bot}