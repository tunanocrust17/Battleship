class Ship {
    constructor(name, length){
        this.name = name
        this.length = length
        this.currentDamage = 0
        this.isSunk = false
    }

    hit(){
        this.currentDamage++
        this.sinkShip()
    }

    sinkShip(){
        if(this.currentDamage === this.length){
            this.isSunk = true
        }
    }

    checkIfSunk(){
        return this.isSunk
    }
}


export {Ship}