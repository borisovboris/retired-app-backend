import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Choice } from 'src/base/entities/choice.entity';
import { Question } from 'src/base/entities/question.entity';
import { Topic } from 'src/base/entities/topic.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class QuestionService {
    choiceRepository: Repository<Choice>;
    topicRepository: Repository<Topic>

    constructor
    (
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
        private readonly connection: Connection
    ) {
        this.choiceRepository = this.connection.getRepository(Choice);
        this.topicRepository = this.connection.getRepository(Topic);
    }

    public async addOpenQuestion(data: any): Promise<void> {
        const { title, type, topicId, maxPoints } = data;
        const topic = await this.topicRepository.findOne({ id: topicId });
        const question = Object.assign(new Question(), { title, type, maxPoints } );

        question.topic = topic;
        await this.questionRepository.save(question);
        return;
    }

    public async addClosedQuestion(data: any): Promise<void> {
        const {title, type, topicId, choices, maxPoints } = data;
        const topic = await this.topicRepository.findOne({ id: topicId });
        const question = Object.assign(new Question(), { title, type, maxPoints } );
       
        question.topic = topic;
        const dbQuestion = await this.questionRepository.save(question);

        for(const choice of choices ) {
            const choiceEntity = await Object.assign(new Choice(), choice);
            choiceEntity.question = dbQuestion;
            await this.choiceRepository.save(choiceEntity);
        }

        return;
    }

    public async getQuestionChoices(questionId: number): Promise<Choice[]> {
        const question = await this.questionRepository.findOne({id: questionId}, { relations: ["choices"]});
        const choices = await question.choices;
        return choices;
    }
}
