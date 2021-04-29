import { EntityRepository, Repository } from 'typeorm';
import { Choice } from 'src/base/entities/Choice.entity';

@EntityRepository(Choice)
export class ChoiceRepository extends Repository<Choice> {

}
