const express = require("express");
const socket = require("socket.io");
const app = express();

const server = app.listen(80, () => {
  console.log("listening on 80");
});

app.use("*", express.static("public/static"));

var lobbies = [];
var io = socket(server);

const chat = io.of("/admin");

io.on("connection", socket => {
  io.sockets.emit("log", socket.id + " joined");
  console.log(socket.id, " joined");
  socket.on("chat", data => {
    console.log(data);
    io.sockets.emit("log", socket.id + " says: " + data);
  });
});

chat.on("connect", socket => {
  chat.sockets.emit("log", socket.id + " joined in admin");
  console.log(socket.id, " joined");
  socket.on("chat", data => {
    console.log(data);
    chat.sockets.emit("log", socket.id + " says: " + data);
  });
});
