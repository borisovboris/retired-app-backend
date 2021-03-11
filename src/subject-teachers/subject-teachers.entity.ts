import { PrimaryColumn, Entity } from "typeorm";

@Entity({ name: "subject-teachers" })
export class SubjectTeachers {

    @PrimaryColumn()
    teacherId: number;

    @PrimaryColumn()
    subjectId: number;
}