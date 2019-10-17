function setup() {
    var socket = io();
    var side = 30;
    var matrix = [];

    let weatherElement = document.getElementById('weather');
    let grassCountElement = document.getElementById('grassCount');
    let grassLiveCountElement = document.getElementById('grassLiveCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let peopleCountElement = document.getElementById('peopleCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let zombieCountElement = document.getElementById('zombieCount');

    socket.on("data", drawCreatures);

    function drawCreatures(data) {



        matrix = data.matrix;
        weatherElement.innerText = data.weather;
        grassCountElement.innerText = data.grassCounter;
        grassLiveCountElement.innerText = data.grassLiveCounter;
        grassEaterCountElement.innerText = data.eatCounter;
        peopleCountElement.innerText = data.huntCounter;
        predatorCountElement.innerText = data.termCounter;
        zombieCountElement.innerText = data.titanCounter;

        createCanvas(matrix[0].length * side, matrix.length * side)

        background('#acacac');

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if (data.weather == "Ամառ") {
                        fill("green");
                    }
                    else if (data.weather == "Աշուն") {
                        fill("orange");
                    }
                    else if (data.weather == "Ձմեռ") {
                        fill("grey");
                    }
                    else if (data.weather == "Գարուն") {
                        fill("green");
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("yellow");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('black');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}