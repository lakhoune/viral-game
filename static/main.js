window.onload = () => {
  var input = document.getElementById("txt");
  var create = document.getElementById("create");
  var lobbyId = document.getElementById("lobbyId");
  var join = document.getElementById("join");
  var output = document.getElementById("log");
    
    
    
  var adminChat = io("/admin");
  var gameSocket = io("/game");

  input.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
      chat(input.value);
      input.value = "";
    }
  });

  create.addEventListener("click", () => {
    rand = Math.floor(Math.random() * 10000);
    gameSocket.emit("createLobby", rand, 4);
  });
  join.addEventListener("click", () => {
    gameSocket.emit("joinLobby", lobbyId.value);
  });

    
    
    
  gameSocket.on("log", (msg) => {
    output.innerHTML += msg + "<br>";
    console.log(msg);
  });
  gameSocket.on("err", (msg) => {
    console.log(msg);
    output.innerHTML +=
      "<strong style='color:red'>" + msg + "</strong>" + "<br>";
    console.log(msg);
  });

    
    
    
    
    
  adminChat.on("chat", (data) => {
    output.innerHTML += data + "<br>";
    console.log(data);
  });
  //Listen for events
  adminChat.on("log", (data) => {
    output.innerHTML += data + "<br>";
  });

  function chat(text) {
    adminChat.emit("chat", text);
  }
};
