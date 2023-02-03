import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerEntity, CustomerModel, CustomerRepository, DocumentTypeRepository } from '../../../data';
import { UpdateCustomerDto } from '../../dtos/update-customer.dto';



@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository,
    private readonly documentTypeRepository: DocumentTypeRepository) {}
  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    return this.customerRepository.findOneById(customerId); 
  }

  getAll(): CustomerEntity[] {
    return this.customerRepository.findAll(); 
  }

  /**
   * Actualizar información de un cliente
   *
   * @param {string} id
   * @param {CustomerModel} customer
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  updatedCustomer(id: string, customer: UpdateCustomerDto): CustomerEntity {
    const oldCostumer = this.customerRepository.findOneById(id);
    if (oldCostumer) {
      oldCostumer.document = customer.document;
      oldCostumer.email = customer.email;
      oldCostumer.fullName = customer.fullName;
      oldCostumer.password = customer.password;
      oldCostumer.phone = customer.phone;
      oldCostumer.avatarUrl = customer.avatarUrl;
      return this.customerRepository.update(id, oldCostumer);
    } else throw new NotFoundException();
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
    const customer = this.customerRepository.findOneById(id).state;
    if(customer) {
      this.customerRepository.findOneById(id).state = false;
      return true;
    }return false;
  }
}