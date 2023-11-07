import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch (err) {
      throw new InternalServerErrorException({ errMsg: err.message });
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const headers: any = request.headers;
    Logger.log(headers, '<<-- headers');
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
