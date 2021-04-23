import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { SessionService } from 'src/base/services/session.service';

@Controller('sessions')
export class SessionController {

    constructor
    (
        private readonly sessionService: SessionService
    ) { }

    @Get() 
    async getSessions() {
        return 'getSessions';
    }
    
    @Post('add')
    async createSession(@Body() body) {
        this.sessionService.createSession(body);
    }
}
