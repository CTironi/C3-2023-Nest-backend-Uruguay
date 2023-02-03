import { Injectable } from '@nestjs/common';

import { DataRangeModel, DepositEntity, DepositRepository, PaginationModel, AccountRepository } from '../../../data';
import { CreateDepositDto } from '../../dtos';

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
    account.balance += deposit.amount 

    const newDeposit = new DepositEntity();
    newDeposit.accountId = account;
    newDeposit.amount = deposit.amount;

    return this.depositRepository.register(newDeposit);

  }

  findAll(): DepositEntity[] {
    return this.depositRepository.findAll();
  }

  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string, soft?: boolean): void {
    if(soft) this.depositRepository.delete(depositId, soft);
    this.accountRepository.delete(depositId);
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