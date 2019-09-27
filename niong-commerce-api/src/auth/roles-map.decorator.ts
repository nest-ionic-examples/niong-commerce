import { SetMetadata } from '@nestjs/common';

export interface Roles {
  GET?: string | string[]
  POST?: string | string[]
  PUT?: string | string[]
  DELETE?: string | string[]
}

export const RolesMap = (roles: Roles) => SetMetadata('rolesMap', roles);
