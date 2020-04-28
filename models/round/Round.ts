import { Team } from "../Team";
import { role } from "../player/Role";
import { Score } from "./Score";
import { board } from "./board";
import { Participant } from "../Participant";
export class Round {
  board: board;
  score: Score;
  roles: role[];

  constructor(virus: Participant[], players: Participant[]) {}
}
