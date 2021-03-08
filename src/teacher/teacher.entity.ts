import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { bcryptConstants } from 'src/bcrypt/bcrypt.constants';

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

   @BeforeInsert()
    async hashPassword(): Promise<void> {
        const salt = await bcrypt.genSalt(bcryptConstants.saltRounds);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    }

}