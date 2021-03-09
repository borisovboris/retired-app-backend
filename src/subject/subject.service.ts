import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubjectService {
   

    constructor(
        @InjectRepository(Subject)
        private readonly subjectRepository: Repository<Subject>) {
    }

    async createSubject(name: string): Promise<void> {
        const entity = Object.assign(new Subject(), { name });
        this.subjectRepository.save(entity);
    }
    
}
