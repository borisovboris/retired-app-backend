import { Choice } from "src/base/entities/choice.entity";
import { Exam } from "src/base/entities/exam.entity";
import { Topic } from "src/base/entities/topic.entity";
import { Column, Entity, Index, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

enum Types {
 Open = "open",
 Closed = "closed"
}

@Entity()
@Index(["title", "topic"], { unique: true })
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("enum", { enum: Types})
    type: Types;

    @Column({ default: 1 })
    maxPoints: number;

    @OneToMany(type => Choice, choice => choice.question, { nullable: true })
    choices: Choice[];

    @ManyToOne(type => Topic, topic => topic.questions)
    topic: Topic;

    @ManyToMany(type => Exam, exam => exam.questions)
    exams: Promise<Exam[]>;
}