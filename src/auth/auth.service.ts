import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { UserService } from 'src/user/user.service';
import { User } from '../user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt/';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async login(user: User): Promise<UserToken {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
        };
        return {
            access_token: this.jwtService.sign(payload),
          };
        }
      
        async validateUser(email: string, password: string): Promise<User> {
          const user = await this.userService.findByEmail(email);
      
          if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
      
            if (isPasswordValid) {
              return {
                ...user,
                password: undefined,
              };
            }
          }
    
        }
      }