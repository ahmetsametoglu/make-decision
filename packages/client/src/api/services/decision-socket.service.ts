import { Dispatch } from 'react';
import { webSocket } from 'rxjs/webSocket';
import Axios from 'axios';
import AppUtil from '@api/util/app.util';
import { AuthUtil } from '@api/util/auth.util';

type Message = { type: 'decision' | 'welcome' | 'subscribe' | 'unsubscribe'; data: any };

export class DecisionSocketService {
  status: 'connected' | 'connecting' | 'disconnected' = 'disconnected';
  decisionId?: string;
  decisionToken?: string;
  isConnectionValid: boolean = false;

  socket = webSocket<Message>({
    url: 'ws://localhost:3003',
    protocol: 'json',
    deserializer: e => JSON.parse(e.data),
    serializer: e => JSON.stringify(e),
  });

  constructor(public dispatch: Dispatch<any>) {
    this.status = 'connecting';
    this.socket.subscribe(
      msg => this.messageReceived(msg), // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => {
        console.log('complete');
        this.status = 'disconnected';
      }, // Called when connection is closed (for whatever reason).
    );
  }

  public async subscribe(decisionId: string) {
    const deviceId = await AppUtil.getDeviceId();
    const authToken = await AuthUtil.getAuthenticationInfo().token;
    this.decisionToken = await (await Axios.post('/token/decision', { decisionId, deviceId, token: authToken })).data;

    this.socket.next({ type: 'subscribe', data: this.decisionToken });
  }

  public unsubscribe() {
    this.socket.unsubscribe();
    this.status = 'disconnected';
  }

  messageReceived(msg: Message) {
    console.log('message received: ', msg);

    switch (msg.type) {
      case 'welcome':
        if (msg.data === this.decisionToken) this.status = 'connected';
        else this.socket.complete();
        break;

      case 'decision':
        console.log(msg.data);
        break;
      default:
        break;
    }
  }
}
