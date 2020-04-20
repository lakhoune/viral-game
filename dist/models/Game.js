"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Round_1 = require("./round/Round");
class Game {
    constructor(capacity, Team_1, Team_2) {
        this.rounds = [];
        for (let index = 0; index < capacity / 2; index++) {
            //create capacity/2 rounds and push them to this.rounds
            this.rounds.push(new Round_1.Round(Team_1.members, Team_2.members));
        }
        this.DNA = Team_1; //1st Team to this.DNA
        this.RNA = Team_2; //2nd Team to this.RNA
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map