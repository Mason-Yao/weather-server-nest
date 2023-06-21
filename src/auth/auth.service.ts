import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @Inject(UserService)
    private userService: UserService,
  ) {}
  register = async (createUserDto: CreateUserDto): Promise<User> => {
    return this.userService.createUser(createUserDto);
  };
}
