import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountEntity, AccountRepository, DataRangeModel, PaginationModel, TransferEntity, TransferRepository } from 'src/data';


import { CreateTrasferDto } from '../../dtos';
import { AccountService } from '../account';


@Injectable()
export class TransferService {
  constructor(private readonly transferRepository: TransferRepository,
    private readonly accountService: AccountService) { }
  /**
   * Crear una transferencia entre cuentas del banco
   *
   * @param {TransferModel} transfer
   * @return {*}  {TransferEntity}
   * @memberof TransferService
   */
  createTransfer(transfer: CreateTrasferDto): TransferEntity {

    const newTransfer = new TransferEntity();
    newTransfer.outcome = this.accountService.removeBalance(transfer.outcomeID, transfer.amount);
    newTransfer.income = this.accountService.addBalance(transfer.incomeID, transfer.amount);
    newTransfer.amount = transfer.amount;
    newTransfer.reason = transfer.reason;
    newTransfer.dateTime = Date.now();

    return this.transferRepository.register(newTransfer);
  }

  /**
   * Obtener historial de transacciones de salida de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistoryOut(
    accountId: string,
    pagination?: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    if (dataRange) {
      return this.transferRepository.findOutcomeByDataRange(accountId, dataRange.dataInit, dataRange.dataFinal);
    } throw new NotFoundException();
  }

  /**
   * Obtener historial de transacciones de entrada en una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistoryIn(
    accountId: string,
    pagination?: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    if (dataRange) {
      return this.transferRepository.findIncomeByDataRange(accountId, dataRange.dataInit, dataRange.dataFinal);
    } throw new NotFoundException()
  }

  /**
   * Obtener historial de transacciones de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistory(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    if (dataRange){
      return this.transferRepository.findIncomeByDataRange(accountId, dataRange.dataInit, dataRange.dataFinal)
      .concat(this.transferRepository.findOutcomeByDataRange(accountId, dataRange.dataInit, dataRange.dataFinal));
    } throw new NotFoundException()
  }

  /**
   * Borrar una transacción
   *
   * @param {string} transferId
   * @memberof TransferService
   */
  deleteTransfer(transferId: string): void {
    this.transferRepository.delete(transferId, true);
  }
}