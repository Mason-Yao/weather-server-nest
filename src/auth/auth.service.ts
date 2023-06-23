import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { OAuth2Client } from 'google-auth-library';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    // @Inject(UserService)
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async register(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUserName(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
  async login(user: any) {
    const payload = { sub: user.userId, username: user.username };
    return {
      accee_token: this.jwtService.sign(payload),
    };
  }
  // async googleLogin(code: string): Promise<CreateUserDto> {
  //   const client = new OAuth2Client(
  //     process.env.GOOGLE_CLIENT_ID,
  //     process.env.GOOGLE_SECRET,
  //     'postmessage',
  //   );
  //   const { tokens } = await client.getToken(code);
  // }
}
