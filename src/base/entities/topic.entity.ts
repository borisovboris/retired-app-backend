import { Subject } from "src/base/entities/subject.entity";
import { Question } from "src/base/entities/question.entity";
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(["name", "subject"], { unique: true })
export class Topic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => Subject, subject => subject.topics, {cascade: true})
    subject: Subject;

    @OneToMany(type => Question, question => question.topic)
    questions: Promise<Question[]>
}