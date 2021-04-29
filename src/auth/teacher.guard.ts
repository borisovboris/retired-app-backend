import { 
    Injectable, 
    CanActivate, 
    ExecutionContext, 
    Logger, 
    HttpException, 
    HttpStatus, 
    UnauthorizedException } from '@nestjs/common';

import { TeacherService } from 'src/base/services/teacher.service';
import { AuthService } from '../base/services/auth.service';
// this guard is used to authenticate a teacher and attach their info to
// the request object
@Injectable()
export class TeacherGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly ts: TeacherService
        ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        try {
            const request = context.switchToHttp().getRequest();
            const authorizationHeaders = request.headers["authorization"];
            const bearerToken = authorizationHeaders.split(' ')[1];
            
            // check for occupation: teacher
            if(!authorizationHeaders || !bearerToken) {
                throw new Error();
            }
    
            const tokenPayload = await this.authService.validateToken(bearerToken);
            const { teacherId } = tokenPayload;

            if(!teacherId) {
                throw new Error();
            }
            
            //works with undefined passed to findById
            const existingUser = await this.ts.findById(undefined);

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