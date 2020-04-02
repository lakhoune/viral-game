const express = require("express");
const socket = require("socket.io");
const app = express();

const server = app.listen(8000, () => {
  console.log("listening on 8000");
});

app.use(express.static("public/static"));

var io = socket(server);

io.on("connection", socket => {
  console.log("made socket connection, id: ", socket.id);
  socket.on("chat", data => {
    console.log(data);
    io.sockets.emit("chat", data);
  });
});
