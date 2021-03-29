import { EntityRepository, Repository } from 'typeorm';
import { Question } from '../base/entities/question.entity';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {

}