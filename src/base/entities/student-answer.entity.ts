import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentQuestion } from "./student-question.entity";

@Entity()
export class StudentAnswer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    text: string;

    @ManyToOne(type => StudentQuestion, studentQuestion => studentQuestion.studentAnswers, { cascade: true })
    studentQuestion: StudentQuestion;
}