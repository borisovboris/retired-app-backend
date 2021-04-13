import { Question } from "src/base/entities/question.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Answer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    isCorrect: boolean;

    @ManyToOne(type => Question, question => question.answers)
    question: Question;
    
}