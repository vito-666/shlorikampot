function setup() {
    var socket = io();
    var side = 40;
    var matrix = [];

    let weatherElement = document.getElementById('weather');
    let grassCountElement = document.getElementById('grassCount');
    let grassLiveCountElement = document.getElementById('grassLiveCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let grassEaterLiveCountElement = document.getElementById('grassEaterLiveCount');
    let peopleCountElement = document.getElementById('peopleCount');
    let peopleLiveCountElement = document.getElementById('peopleLiveCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let predatorLiveCountElement = document.getElementById('predatorLiveCount');
    let zombieCountElement = document.getElementById('zombieCount');
    let zombieLiveCountElement = document.getElementById('zombieLiveCount');
    let cunamiCountElement = document.getElementById('cunamiCount');


    socket.on("data", drawCreatures);

    function drawCreatures(data) {

        matrix = data.matrix;
        weatherElement.innerText = data.weather;
        grassCountElement.innerText = data.grassCount;
        grassLiveCountElement.innerText = data.grassLiveCount;
        grassEaterCountElement.innerText = data.grassEaterCount;
        grassEaterLiveCountElement.innerText = data.grassEaterLiveCount;
        peopleCountElement.innerText = data.peopleCount;
        peopleLiveCountElement.innerText = data.peopleLiveCount;
        predatorCountElement.innerText = data.predatorCount;
        predatorLiveCountElement.innerText = data.predatorLiveCount;
        zombieCountElement.innerText = data.zombieCount;
        zombieLiveCountElement.innerText = data.zombieLiveCount;
        cunamiCountElement.innerText = data.cunamiCount;

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
                        fill("#d1d1d1");
                    }
                    else if (data.weather == "Գարուն") {
                        fill("#689e74");
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
                else if (matrix[i][j] == 6) {
                    fill('#03b1fc');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}