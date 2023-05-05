import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';
import { AUTH_SERVICE } from '@app/common/constants/services';
import { ClientProxy } from '@nestjs/microservices';

export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = this.getTokenAuthentication(context);

    return this.authClient
      .send('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          this.addUser(res, context);
        }),
        catchError(() => {
          throw new UnauthorizedException();
        }),
      );
  }

  private getTokenAuthentication(context: ExecutionContext) {
    let authentication: string;

    if (context.getType() === 'rpc') {
      authentication = context.switchToRpc().getData().Authentication;
    }

    if (context.getType() === 'http') {
      authentication = context.switchToHttp().getRequest()
        .cookies?.Authentication;
    }

    if (!authentication) {
      throw new UnauthorizedException(
        'No value was provided for Authentication',
      );
    }
    return authentication;
  }

  private addUser(user: any, context: ExecutionContext) {
    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = user;
    }
    if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = user;
    }
  }
}
