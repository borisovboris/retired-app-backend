import { Answer } from "src/answer/answer.entity";
import { Exam } from "src/base/entities/exam.entity";
import { Topic } from "src/base/entities/topic.entity";
import { Column, Entity, Index, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

enum Types {
 Open = "open",
 Closed = "closed"
}

@Entity()
@Index(["questionTitle", "topic"], { unique: true })
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    questionTitle: string;

    @Column("enum", { enum: Types})
    type: Types;

    @OneToMany(type => Answer, answer => answer.question)
    answers: Answer[];

    @ManyToOne(type => Topic, topic => topic.questions)
    topic: Topic;

    @ManyToMany(type => Exam, exam => exam.questions)
    exams: Promise<Exam[]>;
}