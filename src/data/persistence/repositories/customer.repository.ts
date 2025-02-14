import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { CustomerEntity } from '../entities';
import { BaseRepository } from './base';
import { CustomerRepositoryInterface } from './interfaces';
import { PaginationModel } from '../../models';

@Injectable()
export class CustomerRepository
  extends BaseRepository<CustomerEntity>
  implements CustomerRepositoryInterface {

  register(entity: CustomerEntity): CustomerEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: CustomerEntity): CustomerEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id && typeof item.daletedAt === 'undefined',
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as CustomerEntity;
    else throw new NotFoundException();
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean): void {

    const index = this.database.findIndex(item => item.id === id);

    if(!index ) throw new NotFoundException();

    if (soft) {
        this.softDelete(index);
    } else {
        this.hardDelete(index);
    }
}

private hardDelete(index: number): void {
    this.database.splice(index, 1);
}

private softDelete(index: number): void {
    this.database[index].daletedAt = Date.now();
}

  findAll(paginator?: PaginationModel): CustomerEntity[] {
    try{ 
        
      let result = this.database.filter( entity => typeof entity.daletedAt === 'undefined');
      
      if( result.length <= 0){ 
          throw new NotFoundException(); 
      }

      if (paginator) {
          let { offset = 0, limit = 0 } = paginator;
          result = result.slice(offset, offset + limit);
      }  

      return result;

  } catch (err){

      throw new InternalServerErrorException(`Internal Error! (${err})`)
  }
  }

  findOneById(id: string): CustomerEntity {
    const currentEntity = this.database.findIndex(
      itemId => itemId.id === id && typeof itemId.daletedAt === 'undefined',
    );
    if(currentEntity ) return this.database[currentEntity];
    else throw new NotFoundException();
    
  }

  findOneByEmailAndPassword(email: string, password: string): boolean {
    const indexCurrentEntity = this.database.findIndex(
      (itemEAndP) =>
        itemEAndP.email === email &&
        itemEAndP.password === password &&
        typeof itemEAndP.daletedAt === 'undefined',
    );
    return indexCurrentEntity > -1 ? true : false;
  }

  findOneByDocumentTypeAndDocument(
    documentTypeId: string,
    document: string,
  ): CustomerEntity {
    const currentEntity = this.database.find(
      (itemDoc) => itemDoc.documentType.id === documentTypeId && itemDoc.document === document && typeof itemDoc.daletedAt === 'undefined',
  );
  if(!currentEntity ) throw new NotFoundException();
  return currentEntity;
  }

  findOneByEmail(email: string): CustomerEntity {
    const currentEntity = this.database.find(
      (itemEmail) => itemEmail.email === email && typeof itemEmail.daletedAt === 'undefined',
  );
  if(!currentEntity ) throw new NotFoundException();
  return currentEntity;
  }

  findOneByPhone(phone: string): CustomerEntity {
    const currentEntity = this.database.find(
      (itemPhone) => itemPhone.phone === phone && typeof itemPhone.daletedAt === 'undefined',
  );
  if(!currentEntity ) throw new NotFoundException();
  return currentEntity;
  }

  findByState(state: boolean): CustomerEntity[] {
    return this.database.filter(
      (itemState) => itemState.state === state && typeof itemState.daletedAt === 'undefined',
  );
  }

  findByFullName(fullName: string): CustomerEntity[] {
    const currentEntity = this.database.filter(
      (itemFName) => itemFName.fullName === fullName && typeof itemFName.daletedAt === 'undefined',
  );
  if(!currentEntity ) throw new NotFoundException();
  return currentEntity;
  }
}