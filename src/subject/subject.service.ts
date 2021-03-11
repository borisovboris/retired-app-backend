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

    async createSubject(name: string, description: string, creatorId: number): Promise<void> {
        const entity = Object.assign(new Subject(), { name, description, creatorId });
        this.subjectRepository.save(entity);
    }
    
}
