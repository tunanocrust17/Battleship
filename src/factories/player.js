import { Gameboard } from "./gameboardFactory"

class Player {
    constructor() {
        this.gameboard = this.#createGameboard(),
        this.gameWon = false
    }

    #createGameboard() {
        let newGameboard = new Gameboard()
        return newGameboard
    }

    attackEnemy( x, y , bot){
        let [attackMessage] = bot.gameboard.receiveInput( x , y )

        if(attackMessage == "it's a hit!" || attackMessage == "it's a miss!") {
            return attackMessage
        } else {
            return "not a valid attack"
        }
    }

}

export {Player}