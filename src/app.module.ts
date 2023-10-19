import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlDataSource } from './schemas';
import { PassportModule } from '@nestjs/passport';
import { ConversationModule } from './conversations/conversation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({}),
      dataSourceFactory: async (options) => {
        return await mysqlDataSource.initialize();
      },
    }),
    AuthModule,
    UserModule,
    ConversationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
