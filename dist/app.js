const express = require("express");
const socket = require("socket.io");
const app = express();
//Express server
const server = app.listen(80, () => {
    console.log("listening on 80");
});
//Static Files -- this is only for testing this will later point to the built angular app
app.use(express.static("static"));
const io = socket(server);
//Namespaces
const chat = io.of("/admin");
const game = io.of("/game");
//Service Middleware
game.use(require("../middleware/serviceMiddleware.js")());
game.on("connection", (socket) => {
    console.log(socket.id, " connected");
    socket.emit("log", "Successfully connected, socket id: " + socket.id);
    socket.on("test", (...args) => {
        console.log("running test");
        socket.services.validation.checkInfix(args[0] || "halloJungs", args[1] || "jungs");
    });
    socket.on("createLobby", (id, size) => {
        socket.services.lobby.createLobby(socket, size, id, (err, lobby, sessionId) => {
            if (err) {
                socket.emit("err", err);
            }
            else {
                socket.emit("log", "Created lobby, lobby id: " + lobby.id);
                socket.emit("log", "Got session id: " + sessionId);
                socket.emit("lobbyID", lobby.id);
                socket.emit("token", sessionId);
            }
        });
    });
    socket.on("joinLobby", (lobbyId) => {
        socket.services.lobby.joinLobby(socket, lobbyId, (err, lobby, sessionId) => {
            if (err) {
                socket.emit("err", err.message);
            }
            else {
                socket.broadcast.to(lobby.id).emit("log", "Member joined lobby ");
                socket.emit("log", "Joined lobby id: " + lobby.id);
                socket.emit("log", "Got session id: " + sessionId);
                socket.emit("token", sessionId);
                socket.emit("lobbyID", lobby.id);
                game
                    .to(lobbyId)
                    .emit("log", "Lobby size: " + lobby.participants.length);
            }
        });
    });
    socket.on("setName", (name) => {
        socket.services.lobby.setName(socket, name, (err, name, status) => {
            if (err) {
                console.log(err);
                socket.emit("err", err);
            }
            else {
                socket.emit("log", "name set to: " + name);
                socket.emit("newName", name); //send name to user
                socket.broadcast
                    .to(socket.currLobby)
                    .emit("log", name + " joined lobby ");
                socket.broadcast //send name to all other users
                    .to(socket.currLobby)
                    .emit("newName", name);
                if (status == "ready") {
                    socket.broadcast.to(socket.currLobby).emit("log", "Lobby is ready");
                }
            }
        });
    });
    socket.on("getLobbySize", () => {
        socket.services.lobby.getLobbySize(socket, (err, capacity) => {
            if (err) {
                socket.emit("err", err);
            }
            else {
                socket.emit("data", capacity);
            }
        });
    });
    socket.on("rejoinLobby", (sessionId, lobbyId) => {
        socket.services.lobby.rejoinLobby(socket, lobbyId, sessionId, (err) => {
            if (err) {
                socket.emit("err", err.message);
            }
            else {
                socket.broadcast.to(lobbyId).emit("log", "Member rejoined lobby ");
                socket.emit("log", "Successfully rejoined lobby id: " + lobbyId);
                socket.emit("lobbyID", lobbyId);
            }
        });
    });
    socket.on("getNames", (lobbyId) => {
        socket.services.lobby.getParticipantNames(socket, lobbyId, (err, names) => {
            if (err) {
                socket.emit("err", err.message);
            }
            else {
                socket.emit("names", names);
            }
        });
    });
    socket.on("disconnect", (data) => {
        let tmp = socket.currLobby;
        if (data == "transport close") {
            socket.services.lobby.removeFromLobby(socket, (err) => {
                if (err) {
                    console.log(err);
                }
                socket.broadcast.to(tmp).emit("log", "Member left lobby ");
            });
        }
    });
});
//chat only for testing
chat.on("connection", (socket) => {
    socket.on("chat", (data) => {
        chat.emit("log", socket.id + " says: " + data);
    });
});
//# sourceMappingURL=app.js.map