import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/base/services/auth.service";
import { StudentService } from "src/base/services/student.service";

@Injectable()
export class StudentGuard implements CanActivate {

    constructor
    (
        private readonly authService: AuthService,
        private readonly studentService: StudentService
    ) {}

    async canActivate(context: ExecutionContext) {
        
        try {
            const request = context.switchToHttp().getRequest();
            const authorizationHeaders = request.headers['authorization'];
            const bearerToken = authorizationHeaders.split(' ')[1];

            if(!authorizationHeaders || !bearerToken) {
                throw new Error();
            }

            const tokenPayload = await this.authService.validateToken(bearerToken);
            const { studentId } = tokenPayload;

            if(!studentId) {
                throw new Error();
            }
            const existingStudent = await this.studentService.findById(studentId);

            if(!existingStudent) {
                throw new Error();
            }

            request.params.userData = {...existingStudent};
            return true;

        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}