import { Question } from 'src/question/question.entity';
import { Subject } from 'src/subject/subject.entity'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exam {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => Subject, subject => subject.exams)
    subject: Subject;

    @ManyToMany(type => Question, question => question.exams, {
        cascade: true,
    })
    @JoinTable()
    questions: Promise<Question[]>

}