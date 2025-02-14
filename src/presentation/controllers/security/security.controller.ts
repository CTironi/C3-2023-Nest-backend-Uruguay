// Libraries
import { Controller, Post, Body, Param } from '@nestjs/common';

import { SecurityService } from 'src/business/services/security/security.service';

import { SignUpDto, SignInDto } from '../../../business/dtos';


@Controller('security')
export class SecurityController {
    
    constructor(private readonly securityService: SecurityService) { }

    @Post('signUp')
    signUp(@Body() signUp: SignUpDto): string{
        return this.securityService.signUp(signUp);
    }

    @Post('signIn')
    signIn(@Body() signIn: SignInDto): string{
        return this.securityService.signIn(signIn)
    }

    @Post('signOut/:token')
    signOut(@Param('token') token: string): void {
        return this.securityService.signOut(token);
    }
}
