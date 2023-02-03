import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, ParseBoolPipe } from '@nestjs/common';

import { DepositService, CreateDepositDto } from '../../../business';
import { DepositEntity } from '../../../data';



@Controller('deposit')
export class DepositController {
    constructor(private readonly depositService: DepositService) { }

    @Post('createDeposit')
    createDeposit(@Body() deposit: CreateDepositDto): DepositEntity {
        return this.depositService.createDeposit(deposit);
    }

    @Get('/findAll')
    findAll(): DepositEntity[] {
        return this.depositService.findAll();
    }

    @Delete('deleteDeposit/:id/:soft')
    deleteDeposit(@Param('id', ParseUUIDPipe) depositId: string, @Param('soft', ParseBoolPipe) soft?: boolean ): void {
        this.depositService.deleteDeposit(depositId, soft);
    }

    @Get('getHistory/:id')
    getHistory(@Param('id', ParseUUIDPipe) depositId: string): DepositEntity[] {
        return this.depositService.getHistory(depositId);
    } 
}

