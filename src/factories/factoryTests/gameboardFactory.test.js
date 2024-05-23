import { gameboardTestData } from "./gameboardTestData";
import { Gameboard } from "../gameboardFactory";


let testingGameboard = new Gameboard();
testingGameboard.placeShip(3,3,'carrier')
testingGameboard.receiveInput(3,3)

test.skip('create new gameboard class', () => {
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
        let [attackMessage, shipHit] = testingGameboard.receiveInput(2,3)
        expect(attackMessage).toBe("it's a hit!")
        expect(shipHit).toEqual(testingGameboard.carrier)
    })

    test('returns a miss on a ship', () => {
        let [attackMessage, shipHit] = testingGameboard.receiveInput(2,2)
        expect(attackMessage).toBe("it's a miss!")
        expect(shipHit).toEqual()
    })

    test('not a valid attack', () => {
        expect(testingGameboard.receiveInput(0,10)).toBe("not a valid attack")
    })

    test('already tried attack', () => {
        expect(testingGameboard.receiveInput(3,3)).toBe("not a valid attack")
    })

})