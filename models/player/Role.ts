import { Participant } from "../Participant";

export abstract class role {
  player: Participant;

  constructor(player: Participant) {
    this.player = player;
  }
}
