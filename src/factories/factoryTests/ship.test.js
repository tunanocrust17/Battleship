import { Ship } from "../ships";

let testBuildShip = new Ship("carrier", 5);
let shipBuildResult = {
    name: "carrier",
    length: 5,
    currentDamage: 0,
    isSunk: false
}

test('creates new ship factory', () => {
    expect(testBuildShip).toMatchObject(shipBuildResult)
})


test('hit method increases ship hits', () => {
    let hitTestShip = new Ship('carrier', 5)
    for(let i = 0 ; i < 4 ; i++) {
        hitTestShip.hit()
    }
    expect(hitTestShip.currentDamage).toBe(4)
})

test('ship is sunk', () =>{
    for( let i = 0 ; i < 5 ; i++){
        testBuildShip.hit()
    }
    expect(testBuildShip.isSunk).toBe(true)
})