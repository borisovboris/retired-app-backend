import { Injectable } from '@nestjs/common';
import { SubjectRepository } from './subject.repository';
import { Connection } from 'typeorm';
import { Subject } from './subject.entity';

@Injectable()
export class SubjectService {
    subjectRepository: SubjectRepository;

    constructor(private connection: Connection) {
        this.subjectRepository = this.connection.getCustomRepository(SubjectRepository);
    }

    async createSubject(name: string): Promise<void> {
        const entity = Object.assign(new Subject(), { name });
        this.subjectRepository.save(entity);
    }
    
}
