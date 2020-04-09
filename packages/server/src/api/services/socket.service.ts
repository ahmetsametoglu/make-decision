import { Server } from 'ws';
import { DecisionEntity } from '../../entities/decision.entity';
import { IDecision } from '@shared/models/decision.model';
import { DecisionTokenPayload } from '../models/token.model';
import JwtService from './jwt.service';

let socketServer: Server;
export const connections: { [key: string]: { [key: string]: WSConnection } } = {};

export const startWebSocket = (port: number) => {
  socketServer = new Server({ port });
  handleEvents();
};

const handleEvents = () => {
  handleConnection();
  socketServer.on('error', handleError);
  socketServer.on('close', handleClose);
  socketServer.on('listening', handleListening);
  socketServer.on('headers', handleHeaders);
};

const handleHeaders = (server: Server, ...args: any[]) => {
  console.log('[WebSocketService]: handle headers');
};
const handleListening = (server: Server) => {
  console.log('[WebSocketService]: handle listening');
};
const handleClose = (server: Server) => {
  console.log('[WebSocketService]: handle close');
};
const handleError = (server: Server, error: Error) => {
  console.log('[WebSocketService]: handle error');
};

const handleConnection = () => {
  socketServer.on('connection', (ws, req) => {
    console.log('client connected');

    if (!!req.headers) {
      const ip = req.connection.remoteAddress;
      const ip1 =
        typeof req.headers['x-forwarded-for'] === 'string'
          ? (req.headers['x-forwarded-for'] as any).split(/\s*,\s*/)[0]
          : '';
      console.log(ip);
      console.log(ip1);
    }

    ws.on('message', async data => {
      console.log('****************************** message  received ***********************');
      console.log(data);

      // setTimeout(() => {
      //   ws.send('message received');
      // }, 500);
      let message;
      try {
        message = JSON.parse(data.toString()) as { type: string; data: string };
        if (typeof message !== 'object') {
          message = JSON.parse(message);
        }
        if (!message || !message['type']) {
          console.log('message is not valid. connection closing...');
          ws.close();
          return;
        }
      } catch (error) {
        console.log('connection closing...', error.message);
        ws.close();
        return;
      }

      console.log('message:', message);

      if (message.type === 'subscribe' && !!message.data) {
        const token = message.data as string;
        const payload = JwtService.resolveToken<DecisionTokenPayload>(token);
        const decision = await DecisionEntity.findById(payload.decisionId);
        console.log('payload:', payload);
        console.log('is decision exist:', !!decision);

        if (!!decision) {
          ws.url = token;
          const connection = { client: ws, clientId: token, ...payload };
          addConnection(connection);
          console.log('client subscribe:', Object.keys(connections).length);
          ws.send(JSON.stringify({ type: 'welcome', data: token }));
        } else {
          ws.close();
        }
      }
      if (message.type === 'unsubscribe' && !!message.data) {
        ws.close();
      }
    });

    ws.on('close', (code, reason) => {
      console.log('****************************** disconnected ***********************');
      console.log('client disconnected', { code, reason });
      deleteConnection(ws.url);
      ws.close();
      console.log('client disconnected:', Object.keys(connections).length);
    });
  });
};

const addConnection = (conn: WSConnection) => {
  if (!connections[conn.decisionId]) {
    connections[conn.decisionId] = {};
  }
  connections[conn.decisionId][conn.clientId] = conn;
};

const deleteConnection = (token: string) => {
  if (!token) {
    console.log(token);
    return;
  }

  const payload = JwtService.resolveToken<DecisionTokenPayload>(token);
  if (!!connections[payload.decisionId]) {
    delete connections[payload.decisionId][token];
    if (Object.keys(connections[payload.decisionId]).length === 0) {
      delete connections[payload.decisionId];
    }
  }
  console.log(connections);
};

export const sendDecisionToClient = (decision: IDecision) => {
  const clients = connections[decision._id];
  console.log('connections:', !!connections && Object.keys(connections));
  console.log('clients:', !!clients && Object.keys(clients));
  console.log('socketServerClientSize', socketServer.clients.size);

  if (!!clients) {
    for (const key in clients) {
      if (clients.hasOwnProperty(key)) {
        const clientConnection = clients[key];

        if (clientConnection.client) {
          // const client = clientConnection.client as WebSocket;
          clientConnection.client.send(JSON.stringify({ type: 'decision', data: decision }));
        }
      }
    }
  } else {
    console.log('subscribed client not exist', decision._id);
  }
};

type WSConnection = { clientId: string; client?: any } & DecisionTokenPayload;

const SocketService = { startWebSocket, sendDecisionToClient };

export default SocketService;
