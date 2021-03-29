import { EntityRepository, Repository } from 'typeorm';
import { Topic } from '../base/entities/topic.entity';

@EntityRepository(Topic)
export class TopicRepository extends Repository<Topic> {

}