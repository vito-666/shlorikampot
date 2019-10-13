// function windowLoad() {
//     console.log("Window is loaded");
//  }
// window.onload = windowLoad;

// function preload() {
//    console.log("Window is loaded");
// }

// function click(evt) {
//     console.log(evt.pageX, evt.pageY);
//  }

//  window.onclick = click;

//  function mousePressed() {
//     console.log(mouseX, mouseY);
//  }

//  function keydown(evt) {
//     console.log("You printed " + evt.key);
//  }

//  window.onkeydown = keydown;

//  function keyPressed() {
//     console.log(key);
//     }

function main() {
   var socket = io();
   var chatDiv = document.getElementById('chat');
   var input = document.getElementById('message');
   var button = document.getElementById('submit');

   function handleSubmit(evt) {
      var val = input.value;
      if (val != "") {
         socket.emit("send message", val);
      }
   }
   button.onclick = handleSubmit;
   function handleMessage(msg) {
      var p = document.createElement('p');
      p.innerText = msg;
      chatDiv.appendChild(p);
      input.value = "";
   }

   socket.on('display message', handleMessage);
}

window.onload = main; 