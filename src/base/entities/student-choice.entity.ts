import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StudentChoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    isCorrect: boolean;

    @Column({ default: false })
    choice: boolean;
}