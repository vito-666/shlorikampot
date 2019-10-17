var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Hunter extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 13;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 3, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 3, this.y - 3],
            [this.x - 3, this.y],
            [this.x + 3, this.y],
            [this.x - 3, this.y + 3],
            [this.x, this.y + 3],
            [this.x + 3, this.y + 3]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            let zombie = new Zombie(x, y);
            zombieArr.push(zombie);
            this.heart = 95;
        }
    }
    utel() {
        let emptyCells = this.chooseCell(3);
        let newCell = random(emptyCells);
        if (newCell) {
            this.energy++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            for (let i in predatorArr) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;
            if (this.heart >= 60) {
                this.mul();
            }
        } else {
            this.move()
        }
    }
    move() {
        this.heart--;
        let emptyCells = this.chooseCell(0);
        let emptyCells1 = this.chooseCell(1);
        let newCell = random(emptyCells.concat(emptyCells1));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;
            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

        }
        if (this.heart < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i in zombieArr) {
            if (zombieArr[i].x == this.x && zombieArr[i].y == this.y) {
                zombieArr.splice(i, 1)
            }
        }
    }
}
