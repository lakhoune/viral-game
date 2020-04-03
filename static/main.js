var input = document.getElementById("txt");

input.addEventListener("keydown", e => {
  if (e.code == "Enter") {
    chat(input.value);
    input.value = "";
  }
});

var output = document.getElementById("log");

var adminChat = io("/admin");

adminChat.on("chat", data => {
  output.innerHTML += data + "<br>";
  console.log(data);
});
//Listen for events
adminChat.on("log", data => {
  output.innerHTML += data + "<br>";
});

function chat(text) {
  adminChat.emit("chat", text);
}
