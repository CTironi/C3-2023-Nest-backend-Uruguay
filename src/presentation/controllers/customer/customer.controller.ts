import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CustomerService } from '../../../business';
import { CustomerEntity} from '../../../data';
import { UpdateCustomerDto } from '../../../business/dtos/update-customer.dto';



@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get('getCustomer/:id')
    getCustomerInfo(@Param('id', ParseUUIDPipe) customerId: string): CustomerEntity {
        return this.customerService.getCustomerInfo(customerId);
    }

    @Get('getAll')
    getCustomers(): CustomerEntity[]{
        return this.customerService.getAll();
    }

    @Put('updateCustomer/:id')
    updatedCustomer(@Param('id', ParseUUIDPipe) id: string,@Body() customer: UpdateCustomerDto): CustomerEntity {
        return this.customerService.updatedCustomer(id, customer);
    }

    @Post('unsubscribe/:id')
    unsubscribe(@Param('id', ParseUUIDPipe) id: string): boolean {
        return this.customerService.unsubscribe(id);
    }
}
