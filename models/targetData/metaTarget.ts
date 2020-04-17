import { target } from "./target";
import { Team } from "../Team";
export class metaTarget extends target {
  Team: Team;

  constructor(word: string, Team: Team) {
    super(word);
  }
}
