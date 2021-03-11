import { 
    Injectable, 
    CanActivate, 
    ExecutionContext, 
    Logger, 
    HttpException, 
    HttpStatus, 
    UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TeacherService } from 'src/teacher/teacher.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly as: AuthService,
        private readonly ts: TeacherService
        ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        try {
            const request = context.switchToHttp().getRequest();
            const authorizationHeaders = request.headers["authorization"];
            const bearerToken = authorizationHeaders.split(' ')[1];

            if(!authorizationHeaders || !bearerToken) {
                throw new Error();
            }
    
            const tokenPayload = await this.as.validateToken(bearerToken);

            const { id } = tokenPayload;
            const existingUser = await this.ts.findById(id);

            if(!existingUser) {
                throw new Error();
            }

            request.params.userData = { ...existingUser };
            return true;

        } catch (error) {
            throw new UnauthorizedException();
        }
       
    }

}