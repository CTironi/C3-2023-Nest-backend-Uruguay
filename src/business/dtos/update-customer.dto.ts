import { IsNumberString, IsUUID, IsOptional, IsString, IsEmail, IsUrl, Min } from 'class-validator';

export class UpdateCustomerDto {


    @IsNumberString(undefined, { message: 'the document must to be a number.' })
    document: string;


    @IsString({ message: 'the full name is not a string.' })
    fullName: string;


    @IsEmail(undefined, { message: 'the data provider is not a valid email.' })
    email: string;


    @IsNumberString()
    phone: string;

    @IsString({ message: "password is not a string." })
    @Min(5)
    password: string;

    state: boolean;

    @IsUrl()
    @IsOptional()
    avatarUrl?: string;

}