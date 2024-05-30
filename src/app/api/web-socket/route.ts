// pages/api/websocket.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'ws';
import { IncomingMessage } from 'http';
import { Socket } from 'net';

interface CustomSocket extends Socket {
  server: {
    ws?: Server;
    on(event: string, listener: (...args: any[]) => void): this;
  };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(res.socket as CustomSocket).server.ws) {
    console.log('Initializing WebSocket server...');
    const wss = new Server({ noServer: true });

    wss.on('connection', function connection(ws: { on: (arg0: string, arg1: (message: any) => void) => void; OPEN: any; send: (arg0: string) => void; }) {
      ws.on('message', function incoming(message: any) {
        console.log('received: %s', message);
        // Broadcast to everyone else.
        wss.clients.forEach(function each(client: { readyState: any; send: (arg0: any) => void; }) {
          if (client !== ws && client.readyState === ws.OPEN) {
            client.send(message);
          }
        });
      });

      ws.send('Welcome to the WebSocket server!');
    });

    (res.socket as CustomSocket).server.on('upgrade', (req: IncomingMessage, socket: Socket, head: Buffer) => {
      if (req.url === '/api/websocket') {
        wss.handleUpgrade(req, socket, head, (ws: any) => {
          wss.emit('connection', ws, req);
        });
      }
    });

    (res.socket as CustomSocket).server.ws = wss;
  } else {
    console.log('WebSocket server already running.');
  }
  res.end();
}
