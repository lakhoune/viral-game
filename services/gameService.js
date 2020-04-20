module.exports = function gameService() {
  const Game = require("../dist/models/Game").Game;
  const Team = require("../dist/models/Team").Team;
  const io = require("socket.io")();

  //random shuffle algorithm found online
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  //assigns clients to room
  async function assignClients(lobby) {
    await lobby.game.DNA.members.forEach((participant) => {
      //for each participant of team DNA
      let socket = io.of("/game").in(lobby.id).connected[participant.socketId]; //get socket of participant
      socket.join(`${lobby.id}.DNA`); //join room for team dna
      socket.emit("log", "Joined Team DNA");
    });
    await lobby.game.RNA.members.forEach((participant) => {
      //for each participant of team RNA
      let socket = io.of("/game").in(lobby.id).connected[participant.socketId]; //get socket of participant
      socket.join(`${lobby.id}.RNA`); //Join room for team rna
      socket.emit("log", "Joined Team RNA");
    });
  }

  gameService.createGame = (socket, callback) => {
    try {
      let lobby = socket.services.lobby.getLobby(socket.currLobby);
      let participants = lobby.participants;
      shuffle(participants);
      let middle = participants.length / 2;
      let Team1 = new Team(participants.slice(0, middle));
      let Team2 = new Team(participants.slice(middle, participants.length));
      let game = new Game(participants.length, Team1, Team2);
      lobby.game = game;

      assignClients(lobby);
      callback(null, game);
    } catch (error) {
      callback(error, null);
    }
  };
  return gameService;
};
