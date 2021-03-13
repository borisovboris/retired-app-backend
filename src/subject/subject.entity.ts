import { Teacher } from 'src/teacher/teacher.entity';
import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Generated, Index, ManyToMany, JoinTable} from 'typeorm';

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

}