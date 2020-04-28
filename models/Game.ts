import { Team } from "./Team";
import { Round } from "./round/Round";
import { Score } from "./round/Score";
export class Game {
  globalScore: Score;
  rounds: Round[]; //type missing
  DNA: Team;
  RNA: Team;

  constructor(capacity: number, Team_1: Team, Team_2: Team) {
    this.rounds = [];
    for (let index = 0; index < capacity / 2; index++) {
      //create capacity/2 rounds and push them to this.rounds
      this.rounds.push(new Round(Team_1.members, Team_2.members));
    }
    this.DNA = Team_1; //1st Team to this.DNA
    this.RNA = Team_2; //2nd Team to this.RNA
  }
}
