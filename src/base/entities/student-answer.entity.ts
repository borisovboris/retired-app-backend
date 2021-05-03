import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentQuestion } from "./student-question.entity";

@Entity()
export class StudentAnswer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    text: string;

    @OneToOne(type => StudentQuestion, studentQuestion => studentQuestion.studentAnswer)
    @JoinColumn()
    studentQuestion: StudentQuestion;
}