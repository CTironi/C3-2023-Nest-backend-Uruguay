import { PaginationModel } from '../../../../models';
export interface BaseRepositoryInterface<T> {
    register(entity: T): T;
    update(id: string, entity: T): T;
    delete(id: string, soft?: boolean): void;
    findAll(paginator: PaginationModel): Array<T>;
    findOneById(id: string): T;
  }