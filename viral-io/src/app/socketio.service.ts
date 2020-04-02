import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {environement} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
socket;
  constructor() { }
      setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }
}


//socket endpoint in environments