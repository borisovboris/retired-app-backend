import { Session } from 'src/base/entities/session.entity';
import { Question } from 'src/base/entities/question.entity';
import { Subject } from 'src/base/entities/subject.entity'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    questions: Promise<Question[]>;

    @OneToMany(type => Session, session => session.exam)
    sessions: Promise<Session[]>;

}