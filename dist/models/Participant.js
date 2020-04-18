"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Participant {
    constructor(socketId) {
        this.sessionId = uuid_1.v4();
        this.socketId = socketId;
        this.status = "active";
    }
}
exports.Participant = Participant;
//# sourceMappingURL=Participant.js.map