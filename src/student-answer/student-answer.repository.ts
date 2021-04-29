import { StudentAnswer } from "src/base/entities/student-answer.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(StudentAnswer)
export class StudentAnswerRepository extends Repository<StudentAnswer> {
    
}