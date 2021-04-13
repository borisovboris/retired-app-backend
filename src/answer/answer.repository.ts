import { EntityRepository, Repository } from 'typeorm';
import { Answer } from 'src/base/entities/answer.entity';

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {

}
