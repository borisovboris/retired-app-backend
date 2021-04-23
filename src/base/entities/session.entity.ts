import { Subject } from './subject.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Teacher } from './teacher.entity';
import { Exam } from './exam.entity';

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @ManyToOne(type => Teacher, teacher => teacher.sessions)
    teacher: Teacher;

    @ManyToOne(type => Subject, subject => subject.sessions)
    subject: Subject;

    @ManyToOne(type => Exam, exam => exam.sessions)
    exam: Exam;
}