import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevelopersModule } from './developers/developers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, //Não pode usar em produção, pois pode causar perda de dados. Use migrações para gerenciar mudanças no banco de dados.
    }),
    DevelopersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
