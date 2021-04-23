import { EntityRepository, Repository } from 'typeorm';
import { Subject } from '../base/entities/subject.entity';

@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject> {

}