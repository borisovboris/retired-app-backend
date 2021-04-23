import { Session } from "src/base/entities/session.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Session)
export class SessionRepository extends Repository<Session>{

}