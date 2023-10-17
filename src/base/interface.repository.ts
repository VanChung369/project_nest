import { DeepPartial, ObjectLiteral } from 'typeorm';

export interface IBaseService<T> {
  create(doc: any, object?: any): Promise<any>;

  findById(id: number): Promise<T>;

  findOneBy(object: object): Promise<T>;

  findOne(object: object): Promise<T>;

  findAll(): Promise<T[] | null>;

  update(
    id: number,
    data: T extends DeepPartial<ObjectLiteral> ? ObjectLiteral : {},
  ): Promise<T>;

  remove(id: number): Promise<any>;
}
