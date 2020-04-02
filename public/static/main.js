//Make connection
var socket = io.connect("http://localhost:80");

var output = document.getElementById("log");

//Listen for events
socket.on("log", data => {
  output.innerHTML += data;
});

function chat(text) {
  socket.emit("chat", text);
}
