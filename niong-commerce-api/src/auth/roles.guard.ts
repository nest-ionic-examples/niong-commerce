import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler()) || [];
    const request = context.switchToHttp().getRequest();
    const rolesMap = this.reflector.get('rolesMap', context.getClass()) || {};
    const rolesMapMethod = rolesMap[request.method];
    if (Array.isArray(rolesMapMethod)) {
      rolesMapMethod.forEach(r => roles.push(r));
    } else if (rolesMapMethod) {
      roles.push(rolesMapMethod)
    }
    if (!roles.length) {
      return true;
    }
    const user = request.user;
    if (user && (user.role === 'ADMIN' || roles.includes(user.role))) {
      return true;
    } else {
      throw new ForbiddenException('Your Permissions are not enough to complete this operation')
    }
  }
}
