import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'is-public';
export const IsPublic = SetMetadata(IS_PUBLIC, true);
