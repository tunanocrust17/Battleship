import { Player } from "./factories/player";
import { Bot } from "./factories/bot";
import { createGamebaordUI } from "./factories/components/gameboardUI";


function gameController() {
    createGamebaordUI()
    const newBot = new Bot();
    const player1 = new Player()

    newBot.placeBotShips();
    console.log(newBot.gameboard.gameboard)

    function placeUserShips(){

        function dragStartHandler(e) {
            e.dataTransfer.setData("shipName", e.target.id)
            e.dataTransfer.setData("shipLength", e.target.dataset.length)
            console.log('drag-start')
            e.target.classList.add('dragging')
        }

        function dragEndHandler(e) {
            e.target.classList.remove('dragging')
        }

        function dragOverHandler(e) {
            e.preventDefault()
        }

        function dropHandler(e) {
            e.preventDefault()

            function checkValidPlacement( x , y , isRotated , shipLength ){
                let board = player1.gameboard.gameboard
                let numRows = board.length
                let numCols = board[0].length

                if(player1.gameboard.gameboard[x][y] !== null){
                    return false
                }

                if(isRotated) {
                    if( x + shipLength > numRows){
                        return false
                    }

                    for ( let i = 0 ; i < shipLength ; i++ ) {
                        if(board[ x + i ] [ y ] !== null) {
                            return false
                        }
                    }

                } else {
                    if( y + shipLength > numCols){
                        return false
                    }

                    for ( let i = 0 ; i < shipLength ; i++ ) {
                        if(board[ x ] [ y + i ] !== null ) {
                            return false
                        }
                    }
                }

                return true
            }

            function cellSiblings(element , distance) {
                let parent = element.parentNode
                let index = Array.prototype.indexOf.call(parent.children , element)
                return parent.children[index + distance]
            }

            function dropShip( x , y , isRotated , shipName, shipLength) {
                if(checkValidPlacement(x , y , isRotated , shipLength)) { 
                    
                    const dragging = document.querySelector('.dragging')
                    let dropCell = e.target
                    // e.target.appendChild(dragging) 


                    if(isRotated) {
                        for ( let i = 0 ; i < shipLength * 10 ; i+=10) {
                            let nextCell = cellSiblings(dropCell , i)
                            nextCell.setAttribute('id' , shipName)
                            console.log(cellSiblings(dropCell, i))
                        }
                    } else {
                        for ( let i = 0 ; i < shipLength ; i++) {
                            let nextCell = cellSiblings(dropCell , i)
                            nextCell.setAttribute('id' , shipName)
                        }
                    }
                    
                    
                    if(isRotated) {
                        for ( let i = 0 ; i < shipLength ; i++ ){
                            player1.gameboard.placeShip( x + i , y , shipName)
                        }
                    } else {
                        for ( let i = 0 ; i < shipLength ; i++ ) {
                            player1.gameboard.placeShip( x , y + i , shipName)
                        }
                    }


                    

                    console.log(player1.gameboard.gameboard)
                }
            }

            // const dragging = document.querySelector('.dragging')
            const shipName = e.dataTransfer.getData("shipName")
            const shipLength = parseInt(e.dataTransfer.getData("shipLength"))
            const datasetX = parseInt(e.target.dataset.x)
            const datasetY = parseInt(e.target.dataset.y)
            let isRotated = false

            dropShip( datasetX , datasetY , isRotated , shipName , shipLength)

        }

        //define ships and board cells
        let userShips = document.querySelectorAll('.draggable')
        let boardCells = document.querySelectorAll('.cell')

        //assign functionality to each ship
        userShips.forEach(ship => {
            ship.addEventListener('dragstart', (e) => dragStartHandler(e))
            ship.addEventListener('dragend', (e) => dragEndHandler(e))
        })

        //assign functionality to the board

        boardCells.forEach(cell => {
            cell.addEventListener('dragover', (e) => dragOverHandler(e))
            cell.addEventListener('drop', (e) => dropHandler(e))
        })

    }

    placeUserShips()
    

}

export {gameController}

