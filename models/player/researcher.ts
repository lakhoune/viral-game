import { role } from "./Role";
import { researchTarget } from "../targetData/researchTarget";
import { Participant } from "../Participant";

export class researcher extends role {
  matrix: researchTarget[];

  constructor(player: Participant, targets: researchTarget[]) {
    super(player);
    this.matrix = targets;
  }
}
