import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CustomerService } from '../../../business';
import { CustomerEntity} from '../../../data';
import { UpdateCustomerDto } from '../../../business/dtos/update-customer.dto';
import { CustomerRepository } from '../../../data/persistence/repositories/customer.repository';



@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService,
                private readonly customerRepository: CustomerRepository
        ) { }

    @Get('getCustomer/:id')
    getCustomerInfo(@Param('id', ParseUUIDPipe) customerId: string): CustomerEntity {
        return this.customerService.getCustomerInfo(customerId);
    }
    @Get('getCustomerByEmail/:email')
    getCustomerIByEmail(@Param('email') email: string): CustomerEntity {
        return this.customerRepository.findOneByEmail(email);
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
