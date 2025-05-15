import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const protectedMethods = ['POST', 'PATCH', 'DELETE'];
        const publicPaths = ['/login', '/users']; // Rotas que não precisam de autenticação
    
        // Permitir acesso a rotas públicas
        if (publicPaths.includes(request.path)) {
            return true;
        }
        
        // Permitir métodos não protegidos (GET)
        if (!protectedMethods.includes(request.method)) {
            return true;
        }
        
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new UnauthorizedException('Authentication failed');
        }
        return user;
    }
}

export class LoginModule {}