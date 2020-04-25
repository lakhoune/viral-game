import { v4 as uuidv4 } from "uuid";

export class Participant {
  socketId: string;
  sessionId: string;
  name: string;
  status: any;

  constructor(socketId) {
    this.sessionId = uuidv4();
    this.socketId = socketId;
    this.status = "active";
  }
}
