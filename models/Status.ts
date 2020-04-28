import { Score } from "./round/Score";

export class Status {
  code: number;
  lap: number;
  move: number;
  globalScore: Score;
  roundScore: Score;

  constructor() {}
}
