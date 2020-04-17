module.exports = function gameService() {
  import Game from "../models/Game";
  import Team from "../models/Team";
  //random shuffle algorithm found online
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  gameService.createGame = (lobby, callback) => {
    try {
      shuffle(participants);
      let middle = participants.length / 2;
      let Team1 = new Team(participants.slice(0, middle));
      let Team2 = new Team(participants.slice(middle, participants.length));
      let game = new Game(participants.length, Team1, Team2);
      callback(null, game);
    } catch (error) {
      callback(error, null);
    }
  };
  return gameService;
};
