import { SetMetadata } from '@nestjs/common';

export const Jwt = (...args: string[]) => SetMetadata('jwt', args);
