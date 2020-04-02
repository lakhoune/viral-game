//Make connection

var output = document.getElementById("log");

var adminChat = io("/admin");

adminChat.on("chat", data => {
  console.log(data);
});
//Listen for events
adminChat.on("log", data => {
  output.innerHTML += data;
});

function chat(text) {
  adminChat.emit("chat", text);
}
