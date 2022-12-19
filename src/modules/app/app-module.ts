import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import app from 'src/config/app';
import { JwtAuthGuard } from '../auth/app/jwt/jwt-auth-guard';
import { AuthModule } from '../auth/auth-module';
import { AppController } from './app-controller';
import { AppService } from './app-service';
import fcm from '../fcm/config/fcm';
import { FcmModule } from '../fcm/fcm-module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [app, fcm],
    }),
    AuthModule,
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
