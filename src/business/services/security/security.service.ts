import { JwtService } from '@nestjs/jwt/dist';
// Libraries
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

// Data transfer objects

// Models

// Repositories
import { CustomerRepository } from '../../../data';

// Services
import { AccountService } from '../account';
import { CreateAccountDto, SignInDto, SignUpDto } from '../../dtos';

// Entities
import {
  AccountTypeEntity,
  CustomerEntity,
  DocumentTypeEntity,
} from '../../../data/persistence';


@Injectable()
export class SecurityService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
    private jwtService: JwtService
  ) {}

  /**
   * Identificarse en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signIn(user: SignInDto): string {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.email,
      user.password,
    );
    if (answer) return this.jwtService.sign(user, { secret: "Sofka", expiresIn: "30d" });
    else throw new UnauthorizedException();
  }

  /**
   * Crear usuario en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signUp(user: SignUpDto): string {
    const documentType = new DocumentTypeEntity()
    documentType.name = user.documentTypeName;

    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = user.document;
    newCustomer.fullName = user.fullName;
    newCustomer.email = user.email;
    newCustomer.phone = user.phone;
    newCustomer.password = user.password;

    const customer = this.customerRepository.register(newCustomer);
  
    if (customer) {   

      const newAccount = new CreateAccountDto();

      newAccount.customerId = customer.id;
      newAccount.accountTypeName = user.accountTypeName;

      const account = this.accountService.createAccount(newAccount);      

      if (account) return this.jwtService.sign(user, { secret: "Sofka", expiresIn: "30d" });
      else throw new InternalServerErrorException();
    } else throw new InternalServerErrorException();
  }

  /**
   * Salir del sistema
   *
   * @param {string} JWToken
   * @memberof SecurityService
   */
  signOut(JWToken: string): void {
    try {
      const token = this.jwtService.verify(JWToken, { secret: "Sofka" });
      return token;
    } catch {
      console.log("Logging Out!");
    }
  }

  
}