import { Injectable, NotFoundException } from '@nestjs/common';

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
        throw new Error('This method is not implemented');
    }

    private hardDelete(index: number): void {
        throw new Error('This method is not implemented');
    }

    private softDelete(index: number): void {
        throw new Error('This method is not implemented');
    }

    findAll(): AccountEntity[] {
        throw new Error('This method is not implemented');
    }

    findOneById(id: string): AccountEntity {
        throw new Error('This method is not implemented');
    }

    findByState(state: boolean): AccountEntity[] {
        throw new Error('This method is not implemented');
    }

    findByCustomer(customerId: string): AccountEntity[] {
        throw new Error('This method is not implemented');
    }

    findByAccountType(accountTypeId: string): AccountEntity[] {
        throw new Error('This method is not implemented');
    }
}