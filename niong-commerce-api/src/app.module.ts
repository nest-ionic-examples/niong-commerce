import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { environment } from './environment';
import { User } from './models/user.model';

@Module({
  imports: [
    TypegooseModule.forRoot(environment.MONGO_DB_URL),
    TypegooseModule.forFeature([User]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
