import { Gameboard } from "./gameboardFactory";

class Bot {
    constructor() {
        this.gameboard = this.#createGameboard()
    }

    #createGameboard() {
        let newGameboard = new Gameboard();
        return newGameboard
    }

    checkValidPlacement( x , y , ship) {
        let board = this.gameboard.gameboard
        const numRows = board.length
        const numCols = board[0].length
        const shipLength = ship.length

        if(board[x][y] !== null){
            return false
        }

        if( y + ship.length > numCols){
            return false
        }

        for ( let i = 0 ; i < ship.length ; i++){
            if(board[ x ][ y + i ] !== null){
                return false
            }
        }

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
                let x = Math.round(Math.random()*9)
                let y = Math.round(Math.random()*9)

                if(this.checkValidPlacement(x , y, shipKeys[j])){
                    let shipLen = ships[shipKeys[j]].length

                    for ( let i = 0 ; i <= shipLen ; i++){
                        this.gameboard.placeShip(x , y + i , shipKeys[j])
                    }
                    placed = true
                }
            }
        }
    }



    attackPlayer( x , y , player ) {
        let [attackMessage] = player.gameboard.receiveInput( x , y )
        
        if(attackMessage == "it's a hit!" || attackMessage == "it's a miss!") {
            console.log("x is " + x , "y is " + y)
            return attackMessage
        } else {
            return this.attackPlayer( x , y , player )
        }
    }

}

export {Bot}