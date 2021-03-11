import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Generated, Index} from 'typeorm';

@Entity()
@Index(["creatorId", "name"], { unique: true })
export class Subject {
    // @PrimaryGeneratedColumn()
    // id: number;

    // @Column()
    // creatorId: number;

    // @Column({
    //     unique: true
    // })
    // name: string;

    // @Column()
    // description: string;
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    creatorId: number;

    @Column()
    name: string;

    @Column()
    description: string;

}