import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { AccountTypeEntity } from '../entities';
import { BaseRepository } from './base';
import { AccountTypeRepositoryInterface } from './interfaces';
import { PaginationModel } from '../../models';

@Injectable()
export class AccountTypeRepository
    extends BaseRepository<AccountTypeEntity>
    implements AccountTypeRepositoryInterface {

    register(entity: AccountTypeEntity): AccountTypeEntity {
        this.database.push(entity);
        return this.database.at(-1) ?? entity;
    }

    update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id,
        );
        if (indexCurrentEntity >= 0)
            this.database[indexCurrentEntity] = {
            ...this.database[indexCurrentEntity],
            ...entity,
            id,
            } as AccountTypeEntity;
        else throw new NotFoundException();
        return this.database[indexCurrentEntity];
    }

    delete(id: string, soft?: boolean | undefined): void {
        const index = this.database.findIndex(itemDel => itemDel.id === id);
        if(!index ) throw new NotFoundException();
        this.database.splice(index, 1);
    }

    findAll(paginator?: PaginationModel): AccountTypeEntity[] {
        try{ 
        
            let result = this.database;

            if(paginator){
                let { offset = 0, limit = 0 } = paginator;
                result = result.slice(offset, offset + limit);
            }
            return result;

        } catch (err){

            throw new InternalServerErrorException(`Internal Error! (${err})`)
        }
    }

    findOneById(id: string): AccountTypeEntity {
        const currentEntity = this.database.find(
            (itemId) => itemId.id === id,
        );
        if(!currentEntity ) throw new NotFoundException();
        return currentEntity;
    }

    findByState(state: boolean): AccountTypeEntity[] {
        return this.database.filter(
            (itemState) => itemState.state === state,
        );
    }

    findByName(name: string): AccountTypeEntity[] {
        const currentEntity = this.database.filter(
            (itemName) => itemName.name === name,
        );
        if(!currentEntity ) throw new NotFoundException();
        return currentEntity;
    }
}