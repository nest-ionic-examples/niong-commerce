import { IoAdapter } from '@nestjs/platform-socket.io';
import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

export interface CustomSocket extends Socket { // <1>
  user: User;
}

export class AuthAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.use((socket: CustomSocket, next) => { // <2>
      if (socket.handshake.query && socket.handshake.query.token) {
        verify(socket.handshake.query.token as string, environment.jwtSecretPassword, (err, decoded: User) => { // <3>
          if (err) {
            next(new Error('Authentication error')); // <4>
          } else {
            socket.user = decoded; // <5>
            next();
          }
        });
      } else {
        next(new Error('Authentication error')); // <6>
      }
    });
    return server;
  }
}
