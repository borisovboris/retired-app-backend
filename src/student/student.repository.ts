import { EntityRepository, Repository } from "typeorm";
import { Student } from "../base/entities/student.entity";



@EntityRepository(Student)

export class StudentRepository extends Repository<Student> {
    
}