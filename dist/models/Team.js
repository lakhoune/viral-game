"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Team {
    constructor(players, name) {
        this.names = [];
        this.members = players;
        this.teamName = name;
        for (const participant of players) {
            this.names.push(participant.name);
        }
    }
}
exports.Team = Team;
//# sourceMappingURL=Team.js.map