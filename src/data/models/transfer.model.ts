import { AccountModel } from './account.model';

export interface TransferModel {
    id: string;
    outcome: AccountModel;
    income: AccountModel;
    amount: number;
    reason: string;
    dateTime: Date | number;
    daletedAt?: Date | number;

}