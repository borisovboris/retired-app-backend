import { Injectable } from '@nestjs/common';
import { SubjectRepository } from 'src/core/repositories/subject.repository';
import { Connection } from 'typeorm';

@Injectable()
export class SubjectService {
    subjectRepository: SubjectRepository;

    constructor(private connection: Connection) {
        this.subjectRepository = this.connection.getCustomRepository(SubjectRepository);
    }

    async createSubject(name: string): Promise<void> {
        this.subjectRepository.createSubject(name);
    }
    
}
