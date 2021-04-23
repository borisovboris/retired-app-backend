import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../entities/session.entity';

@Injectable()
export class SessionService {
    
    constructor
    (   
        @InjectRepository(Session) 
        private readonly sessionRepository: Repository<Session>
    ) {}

    async createSession(body: any) {
        Logger.log(body);
    }
}
