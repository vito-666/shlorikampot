var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class People extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 13;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 2, this.y + 1]
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
            matrix[y][x] = 5;
            let people = new People(x, y);
            peopleArr.push(people);
            this.energy = 100;
        }
    }
    spanel() {
        let emptyCells = this.chooseCell(4);
        let newCell = random(emptyCells);
        if (newCell) {
            this.energy++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            for (let i in zombieArr) {
                if (zombieArr[i].x == x && zombieArr[i].y == y) {
                    zombieArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;
            if (this.energy >= 80) {
                this.mul();
            }
        } else {
            this.move()
        }
    }
    move() {
        this.energy--;

        let emptyCells = this.chooseCell(0);
        let emptyCells1 = this.chooseCell(1);
        let newCell = random(emptyCells.concat(emptyCells1));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;
            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

        }
    }
}