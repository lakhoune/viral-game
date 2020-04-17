// centralize all exports in this index file and create the objects with
// the right config
module.exports = {
  lobby: require("./lobbyService")(),
  game: require("./gameService")(),
  validation: require("./validationService")(),
};
