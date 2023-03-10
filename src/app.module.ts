import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import GraphQLJSON from 'graphql-type-json';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './common/config';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt.guard';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { MessageModule } from './modules/message/message.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: function (config: ConfigService) {
        return {
          type: 'postgres',
          host: config.getOrThrow('database.host'),
          port: config.getOrThrow<number>('database.port'),
          username: config.getOrThrow('database.user'),
          password: config.getOrThrow('database.password'),
          database: config.getOrThrow('database.name'),
          entities: [User],
          logger: 'advanced-console',
          synchronize: true,
          logging: config.getOrThrow('database.enableLogging'),
        };
      },
    }),
    UserModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: function (config: ConfigService) {
        return {
          playground: config.getOrThrow('graphql.enablePlayground'),
          autoSchemaFile: true,
          resolvers: { JSON: GraphQLJSON },
        };
      },
    }),
    AuthModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
