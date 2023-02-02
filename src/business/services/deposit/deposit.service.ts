import { Injectable } from '@nestjs/common';

import { AccountEntity, DataRangeModel, DepositEntity, DepositRepository, PaginationModel } from '../../../data';
import { CreateDepositDto } from '../../dtos';
import { AccountService } from '../account';
import { AccountRepository } from '../../../data/persistence/repositories/account.repository';


@Injectable()
export class DepositService {
  constructor(private readonly depositRepository: DepositRepository,
              private readonly accountRepository: AccountRepository
              ) {}
  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: CreateDepositDto): DepositEntity {
    
    const account = this.accountRepository.findOneById(deposit.accountId)
    account.balance = deposit.amount

    const newDeposit = new DepositEntity();
    newDeposit.accountId = account;
    newDeposit.amount = deposit.amount;

    return this.depositRepository.register(newDeposit);

  }

  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
    this.depositRepository.delete(depositId);
  }

  /**
   * Obtener el historial de los depósitos en una cuenta
   *
   * @param {string} depositId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {DepositEntity[]}
   * @memberof DepositService
   */
  getHistory(
    depositId: string,
    pagination?: PaginationModel,
    dataRange?: DataRangeModel,
  ): DepositEntity[] {
    let history: Array<DepositEntity> = []
    history = this.depositRepository.findByAccountId(depositId);
    return history;
  }
}