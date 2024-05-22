import { gameboardTestData } from "./gameboardTestData";
import { Gameboard } from "../gameboardFactory";


let testingGameboard = new Gameboard();

test('create new gameboard class', () => {
    expect(testingGameboard).toEqual(gameboardTestData)
})

//placeShip
describe('testing placement of ships on board', () =>{
    test('place ships on board', () => {
        testingGameboard.placeShip(2,3,'carrier')
        expect(testingGameboard.getBoard()[2][3]).toEqual('carrier')
    })
})

//receiveAttack
describe('testing attacks on ships if a hit or miss', () => {
    
    test('returns a hit on a ship', () => {
        testingGameboard.placeShip(2,3,'carrier')
        let [attackMessage, shipHit] = testingGameboard.receiveInput(2,3)
        expect(attackMessage).toBe("it's a hit!")
        expect(shipHit).toEqual(testingGameboard.carrier)
    })

    test('returns a miss on a ship', () => {
        let [attackMessage, shipHit] = testingGameboard.receiveInput(2,2)
        expect(attackMessage).toBe("it's a miss!")
        expect(shipHit).toEqual()
    })
})



