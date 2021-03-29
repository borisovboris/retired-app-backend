import { bcryptConstants } from 'src/bcrypt/bcrypt.constants';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';


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

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        const salt = await bcrypt.genSalt(bcryptConstants.saltRounds);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    }
}