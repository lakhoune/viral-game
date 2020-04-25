import { Participant } from "./Participant";

export class Team {
  members: Participant[]; //set type;
  teamName: string;
  names: string[] = [];

  constructor(players: Participant[], name: string) {
    this.members = players;
    this.teamName = name;
    for (const participant of players) {
      this.names.push(participant.name);
    }
  }
}
