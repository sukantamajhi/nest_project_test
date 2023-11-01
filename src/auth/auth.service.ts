import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import usersModel from './models/users.model';
import { signinAuthDto } from './dto/signin-auth.dto';
import * as jwt from 'jsonwebtoken';
import message from 'src/utils/messages';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  async create(createAuthDto: CreateAuthDto) {
    try {
      const saltOrRounds = 10;
      const password: any = createAuthDto.password;
      const hash = await bcrypt.hash(password, saltOrRounds);

      const user = await usersModel.create({
        ...createAuthDto,
        password: hash,
      });

      return {
        status: true,
        user,
        message: message.USER_SIGNEDUP_SUCCESS,
      };
    } catch (error) {
      this.logger.error(error, '<<-- Error in signup');
      return new InternalServerErrorException({ errMsg: error.message });
    }
  }

  async login(data: signinAuthDto) {
    try {
      const user = await usersModel.findOne({
        email: data.email,
        isDeleted: false,
      });

      if (!user) {
        return new NotFoundException();
      } else {
        const isMatch = await bcrypt.compare(data.password, user.password);

        if (!isMatch) {
          return new UnauthorizedException();
        } else {
          const payload = { userId: user._id, email: user.email };

          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d',
          });

          return { access_token: token };
        }
      }
    } catch (err) {
      this.logger.error(err, 'Error in sign in');
      return new InternalServerErrorException({ errMsg: err.message });
    }
  }
}
