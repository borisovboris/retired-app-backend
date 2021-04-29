import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudentAnswer } from "./student-answer.entity";
import { StudentExam } from "./student-exam.entity";
enum Types {
    Open = "open",
    Closed = "closed"
}
@Entity()
export class StudentQuestion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("enum", { enum: Types})
    type: Types;

    //We need to know the number of correct choices there are
    // to display it in the front-end

    @Column()
    maxPoints: number;

    @Column()
    earnedPoints: number;

    @ManyToOne(type => StudentExam, studentExam => studentExam.studentQuestions, { cascade: true })
    studentExam: StudentExam;

    @OneToMany(type => StudentAnswer, studentAnswer => studentAnswer.studentQuestion)
    studentAnswers: StudentAnswer[];
}