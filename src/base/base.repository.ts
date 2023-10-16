import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { IBaseService } from './interface.repository';

export class BaseRepository<T extends BaseEntity, R extends Repository<T>>
  implements IBaseService<T>
{
  constructor(@InjectRepository(Repository<T>) protected readonly repo: R) {}

  async create(doc: any, object?: any): Promise<any> {
    const newdoc = this.repo.create(object);
    return await this.repo.save(newdoc);
  }

  async findById(id: number): Promise<T> {
    return this.repo.findOneBy({ id } as FindOptionsWhere<T>);
  }

  async findOne(object: object): Promise<T> {
    return this.repo.findOneBy(object);
  }

  findAll(): Promise<T[] | null> {
    return this.repo.find();
  }

  async update(
    id: number,
    data: T extends DeepPartial<ObjectLiteral> ? ObjectLiteral : {},
  ): Promise<T> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async remove(id: number): Promise<any> {
    return await this.repo.delete(id);
  }
}
