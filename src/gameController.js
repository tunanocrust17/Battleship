import { Player } from "./factories/player";
import { Bot } from "./factories/bot";
import { createPlayerBoard } from "./factories/components/gameboardUI";


function gameController() {
    createPlayerBoard()
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
            // e.preventDefault()

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
                            dragging.classList.add('hidden')
                        }

                        if(player1.gameboard.checkAllShipsPlaced()){
                            renderGameStartBtn()
                        }

                    } else {
                        for ( let i = 0 ; i < shipLength ; i++ ) {
                            player1.gameboard.placeShip( x , y + i , shipName)
                            dragging.classList.add('hidden')
                            
                        }
                        
                        player1.gameboard.numberOfPlacedShips++
                        if(player1.gameboard.checkAllShipsPlaced()){
                            renderGameStartBtn()
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

    function renderGameStartBtn() {
        let beginGameButton = document.querySelector('.beginGame')
        beginGameButton.classList.remove('hidden')

        beginGameButton.addEventListener('click', () => {
            // displayGameBoards()
            startGame()
        })
    }


    function displayGameBoards() {
        let placeShipSetup = document.querySelector('.placeShipsSetup')
        let setupBoard = document.querySelector('.playerSetupBoard')
        let playerGameboard = document.querySelector('.playerBoard')
        
        //hide ship setup 
        placeShipSetup.classList.add('hidden')

        //show game play div
        while(setupBoard.childNodes.length){
            playerGameboard.appendChild(setupBoard.firstChild)
        }

        let botBoard = document.querySelector('.botBoard')
        botBoard.classList.remove('hidden')

    }

    function startGame() {
        displayGameBoards()
        gameFlow()
    }

    function allowAttack(e) {
        let datasetX = e.target.dataset.x
        let datasetY = e.target.dataset.y
        return player1.attackEnemy(datasetX , datasetY , newBot)
    }

    function activateBotBoard() {
        let botCells = document.querySelectorAll('div.botBoard > div')
        botCells.forEach((cell) => {
            cell.addEventListener('click', (e) => {
                
                let attackMessage =  allowAttack(e)

                    if(attackMessage == "it's a hit!") {
                        e.target.style.backgroundColor = 'green'
                        player1.switchPlayerTurn()
                        gameFlow()
                        console.log(player1.playersTurn)
                        console.log(attackMessage)
                    } else if( attackMessage == "it's a miss!") {
                        e.target.style.backgroundColor = 'red'
                        player1.switchPlayerTurn()
                        gameFlow()
                        console.log(player1.playersTurn)
                        console.log(attackMessage)
                    }
                    else {
                        console.log(player1.playersTurn)
                    }
                })
            })
        }

    function checkWinner() {
        if(player1.gameboard.allShipsSunk == true) {
            return ["Ah sorry the bot beat you this time!" , true ]
        } else if (newBot.gameboard.allShipsSunk == true) {
            return ["You won! Congrats!" , true ]
        }
        
        return ["no winner yet", false]
    }

    function endOfGameFunction(endMessage){
        let gameContainer = document.querySelector('.gameContainer')
        gameContainer.classList.add('hidden')

        let gameOverDiv = document.querySelector('.gameOverDiv')
        let finalMessage = document.createElement('h1')
        finalMessage.innerHTML = endMessage
        gameOverDiv.appendChild(finalMessage)


    }

    function gameFlow() {
        console.log(player1.playersTurn)
        let [winMessage, gameWon] = checkWinner()

        if(gameWon) {
            console.log(winMessage)
            endOfGameFunction(winMessage)
            return 
        } else {
            if(player1.playersTurn == true) {
                activateBotBoard()
            } else {
                //have the bot attack if players turn is false
                const x = Math.round(Math.random()*9)
                const y = Math.round(Math.random()*9)
                newBot.attackPlayer( x , y , player1)

                //get the cell that the bot selected and mark it purple
                let selector = `div[data-x="${x}"][data-y="${y}"]`
                let cellAttacked = document.querySelector(selector)
                cellAttacked.style.backgroundColor = 'purple'

                //switch player turn and keep the game going
                player1.switchPlayerTurn()
                return gameFlow()
            }
        }
        return
    }

}

export {gameController}

