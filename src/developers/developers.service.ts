import { Injectable } from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Repository } from 'typeorm';
import { Developer } from './entities/developer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DevelopersService {
  constructor(
    @InjectRepository(Developer)
    private readonly repository: Repository<Developer>
  ) {}

  create(createDeveloperDto: CreateDeveloperDto) {
    const developer = this.repository.create(createDeveloperDto);
    return this.repository.save(developer);
    return 'This action adds a new developer';
  }

  findAll() {
    return this.repository.find();
    return `This action returns all developers`;
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });

    return `This action returns a #${id} developer`;
  }

  async update(id: string, updateDeveloperDto: UpdateDeveloperDto) {
    const developer = await this.repository.findOneBy({ id }); 
    if (!developer) {
      return null;
    }
    this.repository.merge(developer, updateDeveloperDto);
    return this.repository.save(developer);
  }

  async remove(id: string) {
    const developer = await this.repository.findOneBy({ id });
    if (!developer) {
      return null;
    }
    return this.repository.remove(developer);
  }
}
