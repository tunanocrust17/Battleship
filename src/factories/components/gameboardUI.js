function createGamebaordUI() {
    const placeShipContainer = document.querySelector('.boardPlacementContainer')

    for ( let i = 0 ; i < 10 ; i++) {
        for ( let j = 0 ; j < 10 ; j++) {
            const gridItem = document.createElement('div')
            gridItem.className = 'cell'
            gridItem.dataset.x = i
            gridItem.dataset.y = j
            
            gridItem.textContent="a"
            placeShipContainer.appendChild(gridItem)
        }
    }
}

export {createGamebaordUI}