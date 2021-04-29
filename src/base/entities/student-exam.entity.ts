import { Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "./session.entity";
import { StudentQuestion } from "./student-question.entity";
import { Student } from "./student.entity";

@Entity()
@Index(['student', 'session'], { unique: true })
export class StudentExam {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Student, student => student.studentExams)
    student: Student;

    @ManyToOne(type => Session, session => session.studentExams)
    session: Session;

    @OneToMany(type => StudentQuestion, studentQuestion => studentQuestion.studentExam)
    studentQuestions: StudentQuestion[];
}