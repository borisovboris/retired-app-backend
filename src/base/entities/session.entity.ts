import { Subject } from './subject.entity';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Teacher } from './teacher.entity';
import { Exam } from './exam.entity';
import { StudentExam } from './student-exam.entity';

@Entity()
@Index(['name', 'subject'], { unique: true})
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

    @OneToMany(type => StudentExam, studentExam => studentExam.session)
    studentExams: Promise<StudentExam[]>;
}