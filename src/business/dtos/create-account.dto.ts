import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateAccountDto {

    @IsUUID(4, { message: "This must to be uuid." })
    @IsNotEmpty({ message: "This slot must not be empty."})
    customerId: string;


    @IsNotEmpty({ message: "This slot must not be empty."})
    accountTypeName: string;
}