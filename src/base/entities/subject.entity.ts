import { Exam } from 'src/base/entities/exam.entity';
import { Teacher } from 'src/base/entities/teacher.entity';
import { Topic } from 'src/base/entities/topic.entity';
import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Generated, Index, ManyToMany, JoinTable, OneToMany} from 'typeorm';
import { Student } from './student.entity';

@Entity()
@Index(["creatorId", "name"], { unique: true })
export class Subject {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    creatorId: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(type => Teacher, teacher => teacher.subjects)
    teachers: Promise<Teacher[]>;

    @ManyToMany(type => Student, student => student.subjects)
    students: Promise<Student[]>;

    @OneToMany(type => Topic, topic => topic.subject)
    topics: Promise<Topic[]>;

    @OneToMany(type => Exam, exam => exam.subject)
    exams: Promise<Exam[]>;

}