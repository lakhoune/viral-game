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

  gameService.createGame = (socket, callback) => {
    try {
      let lobby = socket.services.lobby.getLobby(socket.currLobby);
      if (!lobby) {
        throw new Error("lobby non existant");
      }
      let participants = lobby.participants;
        console.log("ruhe vor");
        console.log(participants);
        console.log("dem Sturm");
      shuffle(participants);
      let middle = participants.length / 2;
      let Team1 = new Team(participants.slice(0, middle));
      let Team2 = new Team(participants.slice(middle, participants.length));
        
        console.log("Schaft");
            console.log(Team1);
            console.log(Team2);
        console.log("Eichel");
      let game = new Game(participants.length, Team1, Team2);
      lobby.game = game;
      callback(null, game);
    } catch (error) {
      callback(error, null);
    }
  };
  return gameService;
};
