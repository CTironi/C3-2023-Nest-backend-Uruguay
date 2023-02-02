import { AccountModel } from './account.model';

export interface DepositModel {
    id: string;
    accountId: AccountModel;
    amount: number;
    dateTime: Date | number;
    daletedAt?: Date | number;
}