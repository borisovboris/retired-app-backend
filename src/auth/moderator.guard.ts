import { CanActivate, ExecutionContext, Logger, UnauthorizedException } from "@nestjs/common";

export class ModeratorGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const something = request.body;
        Logger.log(something);
        return Promise.resolve(true);

        try {
            const request = context.switchToHttp().getRequest();
            const something = request.body;
            const userData = request.params.userData;
        } catch {
            throw new UnauthorizedException;
        }
    }
}