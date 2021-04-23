import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { bcryptConstants } from 'src/bcrypt/bcrypt.constants';
import { Subject } from 'src/base/entities/subject.entity';
import { Session } from 'src/base/entities/session.entity';

@Entity({name: 'teacher'})
export class Teacher {

   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   username: string;
   
   @Column()
   email: string;

   @Column()
   password: string;

   @ManyToMany(type => Subject, subject => subject.teachers, {
    cascade: true,
   })
   @JoinTable()
   subjects: Promise<Subject[]>;

   @OneToMany(type => Session, session => session.teacher)
   sessions: Promise<Session[]>;

   @BeforeInsert()
    async hashPassword(): Promise<void> {
        const salt = await bcrypt.genSalt(bcryptConstants.saltRounds);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    }

}