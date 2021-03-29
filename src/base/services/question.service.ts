import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/answer/answer.entity';
import { Question } from 'src/base/entities/question.entity';
import { Topic } from 'src/base/entities/topic.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class QuestionService {
    answerRepository: Repository<Answer>;
    topicRepository: Repository<Topic>

    constructor
    (
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
        private readonly connection: Connection
    ) {
        this.answerRepository = this.connection.getRepository(Answer);
        this.topicRepository = this.connection.getRepository(Topic);
    }

    public async addOpenQuestion(data: any) {
        const { questionTitle, type, topicId } = data;
        const topic = await this.topicRepository.findOne({ id: topicId });
        const question = Object.assign(new Question(), { questionTitle, type} );

        question.topic = topic;
        await this.questionRepository.save(question);
        return;
    }

    public async addClosedQuestion(data: any) {
        const {questionTitle, type, topicId, answers } = data;
        const topic = await this.topicRepository.findOne({ id: topicId });
        const question = Object.assign(new Question(), { questionTitle, type} );
       
        question.topic = topic;
        const dbQuestion = await this.questionRepository.save(question);

        for(const answer of answers ) {
            const answerEntity = await Object.assign(new Answer(), answer);
            answerEntity.question = dbQuestion;
            await this.answerRepository.save(answerEntity);
        }

        return;
    }

    public async getQuestionAnswers(questionId: number) {
        const question = await this.questionRepository.findOne({id: questionId}, { relations: ["answers"]});
        const answers = await  question.answers;
        return answers;
    }
}
