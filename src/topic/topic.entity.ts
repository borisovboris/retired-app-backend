import { Column, Entity } from "typeorm";

@Entity()
export class Topic {
    @Column()
    name: string;

}