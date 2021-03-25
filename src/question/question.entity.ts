import { Answer } from "src/answer/answer.entity";
import { Exam } from "src/exam/exam.entity";
import { Topic } from "src/topic/topic.entity";
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
    answers: Promise<Answer[]>

    @ManyToOne(type => Topic, topic => topic.questions)
    topic: Topic;

    @ManyToMany(type => Exam, exam => exam.questions)
    exams: Promise<Exam[]>
}