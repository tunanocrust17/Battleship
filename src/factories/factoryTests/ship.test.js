import { Ship } from "../ships";

let testShip = new Ship("carrier", 5);
let shipResult = {
    name: "carrier",
    length: 5,
    hits: 0,
    isSunk: false
}

test('creates new ship factory', () => {
    expect(testShip).toMatchObject(shipResult)
})