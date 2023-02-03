import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseUUIDPipe, Post, Query } from '@nestjs/common';

import { CreateTrasferDto, TransferService } from '../../../business';
import { PaginationModel, DataRangeModel, TransferEntity } from '../../../data';

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService) { }


    @Post('create')
    createTransfer(@Body() transfer: CreateTrasferDto): TransferEntity {
        return this.transferService.createTransfer(transfer);
    }

    @Get('getHOut/:id') 
    getHistoryOut(@Param('id', ParseUUIDPipe) accountId: string,@Query('pagination') pagination?: PaginationModel,@Query('dataRange') dataRange?: DataRangeModel): TransferEntity[] {
        return this.transferService.getHistoryOut( accountId, pagination, dataRange );
    }

    @Get('getHIn/:id')
    getHistoryIn(@Param('id', ParseUUIDPipe) accountId: string,@Query('pagination') pagination?: PaginationModel,@Query('dataRange') dataRange?: DataRangeModel): TransferEntity[] {
        return this.transferService.getHistoryIn( accountId, pagination, dataRange );
    }

    @Get('getHistory/:id')
    getHistory(@Param('id', ParseUUIDPipe) accountId: string): TransferEntity[] {
        return this.transferService.getHistory( accountId);
    } 

    @Delete('deleteTransfer/:id/:soft')
    deleteTransfer(@Param('id', ParseUUIDPipe) transferId: string, @Param('soft', ParseBoolPipe) soft?: boolean): void {
        this.transferService.deleteTransfer(transferId, soft);
    }
}

