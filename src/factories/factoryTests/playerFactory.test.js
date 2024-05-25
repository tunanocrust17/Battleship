import { Player } from "../player";
import { gameboardTestData } from "./gameboardTestData";

const playerTest = new Player()


describe('creates new player class', () => {
    test('create new player gameboard', () => {
        expect(playerTest.gameboard).toEqual(gameboardTestData)
    })
})