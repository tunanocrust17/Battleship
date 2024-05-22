import { Ship } from "../ships"

let gameboardTestData = {
    carrier: new Ship('carrier', 5),
    battleship: new Ship('battleship', 4),
    destroyer: new Ship('destroyer', 3),
    submarine: new Ship('submarine', 3),
    patrol: new Ship('patrol', 2),
    gameboard: [
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null]
    ],
    landedAttacks: [],
    missedAttacks: [],
    numberOfSunkShips: 0,
    allShipsSunk: false
}

export {gameboardTestData}