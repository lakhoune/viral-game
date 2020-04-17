import { target } from "./target";
import { Team } from "../Team";
import { metaTarget } from "./metaTarget";
export class virusTarget extends target {
  isTeamTarget: boolean;

  constructor(word: string, target: metaTarget, Team: Team) {
    super(word);
  }
}
