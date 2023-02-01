import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { PaginationModel } from '../../models';
import { AccountEntity } from '../entities';
import { BaseRepository } from './base';
import { AccountRepositoryInterface } from './interfaces';



@Injectable()
export class AccountRepository
    extends BaseRepository<AccountEntity>
    implements AccountRepositoryInterface {

    register(entity: AccountEntity): AccountEntity {
        this.database.push(entity);
        return this.database.at(-1) ?? entity;
    }

    update(id: string, entity: AccountEntity): AccountEntity {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id && typeof item.daletedAt === 'undefined',
        );
        if (indexCurrentEntity >= 0)
            this.database[indexCurrentEntity] = {
            ...this.database[indexCurrentEntity],
            ...entity,
            id,
            } as AccountEntity;
        else throw new NotFoundException();
        return this.database[indexCurrentEntity];
    }

    delete(id: string, soft?: boolean): void {

        const index = this.database.findIndex(itemIndex => itemIndex.id === id);

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

    findAll(paginator?: PaginationModel): AccountEntity[] {
                
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

    findOneById(id: string): AccountEntity {

        try {

            const index = this.findIndexById(id);

            if (index == -1) {
                throw new NotFoundException();
            }

            return this.database[index];

        } catch (err) { 

            throw new InternalServerErrorException(`Internal Error! (${err})`)
        }
    }


    /**
     * Search in the DB for an element with the given ID 
     * @param id unique key identifier to find
     * @returns the index or an exception
     */
    findIndexById(id: string): number {
            
        try{

            const index = this.database.findIndex(account => account.id === id 
                            && typeof account.daletedAt === 'undefined' ) ; 

            if(index == -1) { throw new NotFoundException(); }

            return index; 

        }catch(err){

            throw new InternalServerErrorException(`Internal Error! (${err})`)
        }
    }

    findByState(state: boolean): AccountEntity[] {
        return this.database.filter(
            (item) => item.state === state && typeof item.daletedAt === 'undefined',
        );
    }

    findByCustomer(customerId: string): AccountEntity[] {
        const currentEntity = this.database.filter(
            (item) => item.customerId.id === customerId && typeof item.daletedAt === 'undefined',
        );
        if(!currentEntity ) throw new NotFoundException();
        return currentEntity;
    }

    findByAccountType(accountTypeId: string): AccountEntity[] {
        const currentEntity = this.database.filter(
            (item) => item.accountTypeId.id === accountTypeId && typeof item.daletedAt === 'undefined',
        );
        if(!currentEntity ) throw new NotFoundException();
        return currentEntity;
    }
}