import { role } from "./role";
import { virusTarget } from "../targetData/virusTarget";
import { Participant } from "../Participant";
export class virus extends role {
  matrix: virusTarget[];

  constructor(player: Participant, targets: virusTarget[]) {
    super(player);
    this.matrix = targets;
  }
}
