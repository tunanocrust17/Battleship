function createGameboardUI(board) {

    for ( let i = 0 ; i < 10 ; i++) {
        for ( let j = 0 ; j < 10 ; j++) {
            const gridItem = document.createElement('div')
            gridItem.className = 'cell'
            gridItem.dataset.x = i
            gridItem.dataset.y = j
            
            board.appendChild(gridItem)
        }
    }
}

function createPlayerBoard() {
    const placeShipContainer = document.querySelector('.playerSetupBoard')
    createGameboardUI(placeShipContainer)
}

function createBotBoard() {
    const botBoard = document.querySelector('.botBoard')
    createGameboardUI(botBoard)
}

export {createPlayerBoard, createBotBoard}