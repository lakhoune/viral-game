const services = require("../services");

function serviceMiddleware() {
  return (socket, next) => {
    socket.services = services;
    next();
  };
}

module.exports = serviceMiddleware;
