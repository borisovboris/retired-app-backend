import { StudentQuestion } from "src/base/entities/student-question.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(StudentQuestion)
export class StudentQuestionRepository extends Repository<StudentQuestion>{
    
}