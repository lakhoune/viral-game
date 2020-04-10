module.exports = function validationService() {
  validationService.checkLobbyId = (lobbies, id) => {
    for (let i = 0; i < lobbies.length; i++) {
      if (lobbies[i].id == id) {
        throw new Error("lobby id already taken");
      }
    }
  };
  validationService.isValidName = (name) => {
    if (!name || name.length < 3) {
      throw new Error("Please provide a name of at least 3 characters");
    }
  };
  validationService.checkDuplicate = async (lobbyId, socketId) => {
    return await new Promise((resolve, reject) => {
      io.of("/game")
        .in(lobbyId)
        .clients((error, clients) => {
          if (error) throw error;
          for (const client of clients) {
            if (client == socketId)
              throw new Error("duplicate joining process");
          }
          resolve();
        });
    });
  };
  validationService.hasFreeSpace = (lobby) => {
    if (lobby.participants.length >= lobby.capacity) {
      throw new Error("lobby full");
    }
  };
  validationService.checkSize = (sizes, size) => {
    if (!sizes.includes(size)) {
      throw new Error(
        "Size of " + size + " not supported, supported sizes are: " + sizes
      );
    }
  };
  return validationService;
};
