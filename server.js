var Grass = require("./modules/grass.js");
var GrassEater = require("./modules/grasseater.js");
var People = require("./modules/people.js");
var Predator = require("./modules/predator.js");
var Zombie = require("./modules/zombie.js");
let random = require('./modules/random');

grassArr = [];
grasseaterArr = [];
peopleArr = [];
predatorArr = [];
zombieArr = [];
matrix = [];

grassHashiv = 0;
grasseaterHashiv = 0;
peopleHashiv = 0;
predatorHashiv = 0;
zombieHashiv = 0;


function matrixGenerator(matrixSize, grass, grasseater, people, predator, zombie) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grasseater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < people; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < zombie; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 25, 20, 15, 10, 2);

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grasseater = new GrassEater(x, y);
                grasseaterArr.push(grasseater);
                grasseaterHashiv++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var people = new People(x, y);
                peopleArr.push(people);
                peopleHashiv++
            }
            else if (matrix[y][x] == 4) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorHashiv++
            }
            else if (matrix[y][x] == 5) {
                var zombie = new Zombie(x, y);
                zombieArr.push(zombie);
                zombieHashiv++
            }
        }
    }
}

creatingObjects();

let exanak = 0;
let weather = ""

function game() {

    exanak++;
    if (exanak <= 10) {
        weather = "Ամառ"
    } else if (exanak <= 20) {
        weather = "Աշուն"
    } else if (exanak <= 30) {
        weather = "Ձմեռ"
    } else if (exanak <= 40) {
        weather = "Գարուն"
    }
    else if (exanak > 40) {
        exanak = 0
    }




    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grasseaterArr[0] !== undefined) {
        for (var i in grasseaterArr) {
            grasseaterArr[i].eat();
        }
    }
    if (peopleArr[0] !== undefined) {
        for (var i in peopleArr) {
            peopleArr[i].spanel();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].namnam();
        }
    }
    if (zombieArr[0] !== undefined) {
        for (var i in zombieArr) {
            zombieArr[i].utel();
        }
    }

    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassLiveCounter: grassArr.length,
        eatCounter: grasseaterHashiv,
        huntCounter: peopleHashiv,
        termCounter: predatorHashiv,
        titanCounter: zombieHashiv,
        weather: weather
    }

    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)