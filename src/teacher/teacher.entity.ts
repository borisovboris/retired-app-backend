import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { bcryptConstants } from '../bcrypt/bcrypt.constants';

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        nullable: false
    })
    username: string;

    @Column({
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        nullable: false
    })
    password: string;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        bcrypt.genSalt(bcryptConstants.saltRounds, function(err, salt) {
            bcrypt.hash(this.password, salt, function(err, hash) {
                      this.password = hash;
             });
          });
    }

}