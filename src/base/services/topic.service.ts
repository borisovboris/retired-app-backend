import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/base/entities/subject.entity';
import { Topic } from 'src/base/entities/topic.entity';
import { Connection, Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
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

    public async getTopic(topicId: number): Promise<Topic> {
        const id = topicId;
        const topic = await this.topicRepository.findOne(id);
        return topic;
    }

    public async addTopicToSubject(name: string, subjectId: number): Promise<void> {
        const topic = new Topic();
        topic.name = name;
        const subject = await this.subjectService.getById(subjectId);
        topic.subject = subject;
        await this.topicRepository.save(topic);
    }

    public async getSubjectTopics(subjectId: number): Promise<Topic[]> {
        const id = subjectId;
        const subject = await this.subjectRepository.findOne(id);
        const topicsOfSubject = await subject.topics;
        return topicsOfSubject;
    }

    public async getTopicQuestions(topicId): Promise<Question[]> {
        const id = topicId;
        const topic = await this.topicRepository.findOne(id, { relations: ["questions"] });
        const questions = await topic.questions;
        // Logger.log(JSON.stringify(await questions[1]["choices"]));
        return questions;
    }
}
