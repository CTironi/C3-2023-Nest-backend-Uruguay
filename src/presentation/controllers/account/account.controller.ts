import { Body, Controller, Delete, Get, InternalServerErrorException, Logger, Param, ParseBoolPipe, ParseFloatPipe, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';

import { AccountService, CreateAccountDto } from '../../../business';
import { AccountEntity, AccountRepository, AccountTypeEntity } from '../../../data';
import { ObservableHandler } from '../../../common/ob/observable.handler';


@Controller('account')
export class AccountController extends ObservableHandler{
    constructor(private readonly accountService: AccountService,
                private readonly accountRepository: AccountRepository
        ) { 
            super();
        }

    private logger = new Logger('AccountController')


    @Post('createAccount')
    createAccount(@Body() createAccount: CreateAccountDto): AccountEntity {
        const newAccount: AccountEntity = this.accountService.createAccount(createAccount);

        this.handler(newAccount).subscribe(accountCreated => {
            this.logger.log('Account created : ${accountCreated}')
        });

        return newAccount;
    }

    @Get('getBalance/:id')
    getBalance(@Param('id', ParseUUIDPipe)  accountId: string): number {
        const balance = this.accountService.getBalance(accountId);
        return balance;
    }

    @Get('getAll')
    getAll(): AccountEntity[] {
        return this.accountService.getAllAccounts();
    }

    @Get('/getByCustomerId/:id')
    getAccountByCostumerId(@Param('id') customer: string): AccountEntity[] {
        return this.accountService.getAccountByCustomerId(customer);
    }

    @Post('addBalance/:id/:amount')
    addBalance(@Param('id', ParseUUIDPipe) accountId: string,@Param('amount', ParseFloatPipe) amount: number): AccountEntity {
        return this.accountService.addBalance(accountId, amount);
    }

    @Post('removeBalance/:id/:amount')
    removeBalance(@Param('id', ParseUUIDPipe) accountId: string,@Param('amount', ParseFloatPipe) amount: number): AccountEntity {
        return this.accountService.removeBalance(accountId, amount);
    }

    @Get('verifyAmount/:id/:amount')
    verifyAmountIntoBalance(@Param('id', ParseUUIDPipe) accountId: string,@Param('amount', ParseFloatPipe) amount: number): boolean {
        return this.accountService.verifyAmountIntoBalance(accountId, amount);
    }

    @Get('getState/:id')
    getState(@Param('id', ParseUUIDPipe) accountId: string): boolean {
        return this.accountService.getState(accountId);
    }

    @Put('changeState/:id')
    changeStat(@Param('id', ParseUUIDPipe) accountId: string,@Query('state', ParseBoolPipe) state: boolean): void{
        return this.accountService.changeState(accountId, state);
    }

    @Get('getAccountType/:id')
    getAccountType(@Param('id', ParseUUIDPipe) accountId: string): AccountTypeEntity {
        return this.accountService.getAccountType(accountId);
    }

    @Put('changeAccountType/:id')
    changeAccountType(@Param('id', ParseUUIDPipe) accountId: string,@Param('accountTypeId', ParseUUIDPipe) accountTypeId: string): AccountTypeEntity {
        return this.accountService.changeAccountType(accountId, accountTypeId);
    }

    @Delete('deleteAccount/:id/:soft')
    deleteAccount(@Param('id', ParseUUIDPipe) accountId: string,@Param('soft', ParseBoolPipe) soft: boolean): void {
        if(this.getBalance(accountId) === 0){
            this.accountRepository.delete(accountId, soft);
        }else{
            throw new InternalServerErrorException("Account is not Empty!. Delete Canceled");
        }
        }
}
