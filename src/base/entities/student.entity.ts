import { bcryptConstants } from 'src/bcrypt/bcrypt.constants';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Subject } from './subject.entity';



@Entity()

export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    facultyNumber: number;

    @Column()
    password: string;

    @ManyToMany(type => Subject, subject => subject.students, {
        cascade: true
    })
    @JoinTable()
    subjects: Promise<Subject[]>;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        const salt = await bcrypt.genSalt(bcryptConstants.saltRounds);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    }
}