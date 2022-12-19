import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import app from 'src/config/app';
import { JwtAuthGuard } from '../auth/app/jwt/jwt-auth-guard';
import { AuthModule } from '../auth/auth-module';
import { AppController } from './app-controller';
import { AppService } from './app-service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import database from 'src/config/database';
import fcm from '../fcm/config/fcm';
import { FcmModule } from '../fcm/fcm-module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [app, database, fcm],
    }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>(
          'database',
        ) as TypeOrmModuleOptions,
    }),
    FcmModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
