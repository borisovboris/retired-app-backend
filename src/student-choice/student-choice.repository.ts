import { StudentChoice } from "src/base/entities/student-choice.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(StudentChoice)
export class StudentChoiceRepository extends Repository<StudentChoice> {
}