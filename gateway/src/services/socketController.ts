import { Server } from 'http';
import socketio, { Socket } from 'socket.io';
import { HttpMethod } from '../common/enums/http-method';
import { env } from '../env';

export class SocketController {
  #connections = new Map<string, Array<Socket>>();

  constructor(server: Server) {
    const io = (socketio as any)(server, {
      cors: {
        origin: env.app.origin,
        methods: [HttpMethod.GET, HttpMethod.POST]
      }
    });

    io.on('connection', (socket: Socket) => {
      console.log('Socket connected');
      const { userId } = socket.handshake.query;
      this.addConnection(userId as string, socket);

      socket.emit('eventExample');

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
        this.deleteConnection(userId as string, socket);
      });
    });
  }

  addConnection(userId: string, socket: Socket) {
    const userSockets = this.#connections.get(userId);
    if (userSockets) {
      userSockets.push(socket);
    } else {
      this.#connections.set(userId, [socket]);
    }
  }

  send(userId: string, event: string, data: any) {
    const userSockets = this.#connections.get(userId);
    userSockets?.forEach(socket => {
      socket.emit(event, data);
    });
  }

  sendToGroup(userIds: Array<string>, event: string, data: any) {
    userIds.forEach(userId => this.send(userId, event, data));
  }

  deleteConnection(userId: string, socket: Socket) {
    const userSockets = this.#connections.get(userId);
    const i = userSockets.indexOf(socket);
    userSockets.splice(i, 1);
  }
}
