import { Game } from "./Game";
import { Participant } from "./Participant";

export class Lobby {
  id: number;
  capacity: number;
  status: String;
  participants: Participant[]; //set type
  game: Game;

  constructor(id: number, capacity: number) {
    this.id = id;
    this.capacity = capacity;
    this.status = "00";
  }
}
