import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'DB',
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get<string>('DB_DATABASE'),
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER', 'root'),
        password: configService.get<string>('DB_PASSWORD', '1234'),
        autoLoadEntities: true,
        synchronize: true,
        retryDelay: 5000,
      }),
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    TodosModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
