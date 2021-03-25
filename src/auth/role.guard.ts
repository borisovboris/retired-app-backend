import { CanActivate, ExecutionContext, Inject, Logger,  mixin,  UnauthorizedException } from "@nestjs/common";
import { SubjectService } from "src/base/services/subject.service";

export const RoleGuard = (role: string) => {
    
    class RoleGuardMixin implements CanActivate {
        constructor(
            @Inject(SubjectService) private readonly subjectService: SubjectService
        ) {}

        async canActivate(context: ExecutionContext) {
            const request = context.switchToHttp().getRequest();
            //try to get origin url here and take the subjectID
            // Logger.log(request.headers);
            
            const subjectId = request.headers["subject-id"]; //subject-id is in the request's headers
            const userData = request.params.userData; // userData was attached to the request by the authguard 
            const userId = userData['id'];

            if(role === 'moderator') {    
                const isModerator = await this.subjectService.isSubjectModerator(subjectId, userId);
                if(isModerator) {
                    request.params.subjectId = subjectId;
                    return true;
                } else {
                    throw new UnauthorizedException();
                }
            } else if (role === 'owner') {
                const isOwner = await this.subjectService.isSubjectOwner(subjectId, userId);
                if(isOwner) {
                    request.params.subjectId = subjectId;
                    return true;
                } else {
                    throw new UnauthorizedException();
                }
            }
        }
    }

    const guard = mixin(RoleGuardMixin);
    return guard;
}