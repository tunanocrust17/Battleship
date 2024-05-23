import { Ship } from "./ships"

class Gameboard {
    constructor(){
        this.carrier = this.#createShip('carrier', 5),
        this.battleship = this.#createShip('battleship', 4),
        this.destroyer = this.#createShip('destroyer', 3),
        this.submarine = this.#createShip('submarine', 3),
        this.patrol = this.#createShip('patrol', 2),
        this.gameboard = this.#createGameboard(),
        this.landedAttacks = [],
        this.missedAttacks = [],
        this.numberOfSunkShips = 0,
        this.allShipsSunk = false
    }

    #createShip(name, length){
        let newShip = new Ship(name, length)
        return newShip
    }

    #createGameboard() {
        let newBoard = []
        
        for( let i = 0 ; i < 10 ; i++) {
            let row = []
            for ( let j = 0 ; j < 10 ; j++) {
                row.push(null)
            }
            newBoard.push(row)
        }

        return newBoard
    }

    placeShip(x, y, name) {
        let board = this.gameboard
        board[x][y] = name
    }

    getBoard() {
        let board = this.gameboard;
        return board
    }

    getMissedAttacks() {
        const missedAttacks = [...this.missedAttacks]
        return missedAttacks
    }

    getSuccessfulAttacks() {
        const successfulAttacks = [...this.landedAttacks]
        return successfulAttacks
    }

    #isArrayInArray(source, search) {
        for (let i = 0 ; i < source.length ; i++ ){
            if (source[i][0] === search[0] && source[i][1] === search[1]) {
                return true;
            }
        }
        return false;
    }

    isValidAttack(x,y) {
        let wasSuccessfulAttack = !this.#isArrayInArray(this.getSuccessfulAttacks(), [x,y])
        let wasMissedAttack = !this.#isArrayInArray(this.getMissedAttacks(), [x,y])
        let withinRange = (x >= 0 && x < 10 && y >= 0 && y < 10)


        return wasMissedAttack 
            && wasSuccessfulAttack 
            && withinRange
    }

    receiveInput(x, y){

        if(this.isValidAttack(x,y)){
            let board = this.gameboard

            let ships = {
                carrier: this.carrier,
                battleship: this.battleship,
                destroyer: this.destroyer,
                submarine: this.submarine,
                patrol: this.patrol
            }
            if(board[x][y] !== null){
                let target = ships[board[x][y]]
                target.hit()
                this.landedAttacks.push([x,y])
                return ["it's a hit!", target]
            } else {
                this.missedAttacks.push([x,y])
                return ["it's a miss!"]
            }
        } else return "not a valid attack"
    }
}

export {Gameboard}