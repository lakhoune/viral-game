import { Participant } from "./Participant";

export class Team {
  members: Participant[]; //set type;

  constructor(players: Participant[]) {
    this.members = players;
  }
}
