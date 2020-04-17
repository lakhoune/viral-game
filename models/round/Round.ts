import { Team } from "../Team";
import { role } from "../player/Role";
import { score } from "./score";
import { board } from "./board";
import { Participant } from "../Participant";
export class Round {
  board: board;
  score: score;
  roles: role[];

  constructor(virus: Participant[], players: Participant[]) {}
}
