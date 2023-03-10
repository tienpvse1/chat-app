import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { readFileSync } from 'fs';
import { join } from 'path';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthResolver, AuthService, JwtStrategy],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        privateKey: readFileSync(join(__dirname, '../../../', 'private.pem')),
        publicKey: readFileSync(join(__dirname, '../../../', 'public.pem')),
        signOptions: {
          expiresIn: config.getOrThrow('jwt.lifeSpan'),
          algorithm: 'RS256',
          issuer: 'http://localhost:3000',
        },
      }),
    }),
  ],
})
export class AuthModule {}
