import { v4 as uuid } from 'uuid';

import { CustomerModel, AccountTypeModel, AccountModel } from '../../models';

export class AccountEntity implements AccountModel {
    id = uuid();
    customerId: CustomerModel;
    accountTypeId: AccountTypeModel;
    balance = 0;
    state = true;
    daletedAt: number | Date;
}