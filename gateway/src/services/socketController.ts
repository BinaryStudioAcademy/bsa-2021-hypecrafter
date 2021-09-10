import { Server } from 'http';
import fetch from 'node-fetch';
import socketio, { Socket } from 'socket.io';
import { SocketActions } from '../common/enums';
import { HttpMethod } from '../common/enums/http-method';
import { env } from '../env';

export class SocketController {
  #connections = new Map<string, Array<Socket>>();

  #io: any;

  constructor(server: Server) {
    const io = (socketio as any)(server, {
      cors: {
        origin: env.app.origin,
        methods: [HttpMethod.GET, HttpMethod.POST]
      }
    });

    this.#io = io;

    io.on('connection', (socket: Socket) => {
      console.log('Socket connected');
      let roomId: string = null;
      const { userId } = socket.handshake.query;
      this.addConnection(userId as string, socket);

      socket.emit('eventExample');

      socket.on(SocketActions.JOIN_CHAT, ({ teamId }: { teamId: string }) => {
        console.log('Joooin chat');
        roomId = teamId;
        socket.join(teamId);
        console.log(roomId);
        console.log(this.#connections);
      });

      socket.on(SocketActions.NEW_MESSAGE, ({ text }: { text: string }) => {
        fetch('http://localhost:3001/chat/new-message', {
          method: 'post',
          body: JSON.stringify({ text, authorId: userId, chatId: roomId }),
          headers: { 'Content-Type': 'application/json' },
        });
        console.log('Mew Message');
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
        if (roomId) {
          socket.leave(roomId);
          roomId = null;
        }
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

  sendToRoom(roomId: string, event: string, data: any) {
    this.#io.in(roomId).emit(event, data);
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
