import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/subject/subject.entity';
import { Topic } from 'src/topic/topic.entity';
import { Connection, Repository } from 'typeorm';
import { SubjectService } from './subject.service';

@Injectable()
export class TopicService {
    private readonly subjectRepository: Repository<Subject>

    constructor
        (
            private readonly subjectService: SubjectService,
            @InjectRepository(Topic)
            private readonly topicRepository: Repository<Topic>,
            private readonly connection: Connection
        ) {
        this.subjectRepository = this.connection.getRepository(Subject);
    }

    public async addTopicToSubject(name: string, subjectId: number) {
        const topic = new Topic();
        topic.name = name;
        const subject = await this.subjectService.getById(subjectId);
        topic.subject = subject;
        await this.topicRepository.save(topic);
    }

    public async getTopicsOfSubject(subjectId: number) {
        const id = subjectId;
        const subject = await this.subjectRepository.findOne(id);
        const topicsOfSubject = await subject.topics;
        return topicsOfSubject;
    }
}
