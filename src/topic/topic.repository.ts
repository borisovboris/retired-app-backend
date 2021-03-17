import { EntityRepository, Repository } from 'typeorm';
import { Topic } from './Topic.entity';

@EntityRepository(Topic)
export class TopicRepository extends Repository<Topic> {

}