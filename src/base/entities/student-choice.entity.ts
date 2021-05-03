import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentQuestion } from "./student-question.entity";

@Entity()
export class StudentChoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    isCorrect: boolean;

    @Column({ default: false })
    choice: boolean;

    @ManyToOne(type => StudentQuestion, studentQuestion => studentQuestion.studentChoices, { cascade: true })
    studentQuestion: StudentQuestion;
}