import { Module } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { DevelopersController } from './developers.controller';
import { Developer } from './entities/developer.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([Developer])],
  controllers: [DevelopersController],
  providers: [DevelopersService],
})
export class DevelopersModule {}
