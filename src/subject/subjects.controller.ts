import { Body, Controller, Get, Logger, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { SubjectService } from './subject.service';

@Controller('subjects')
@UseGuards(AuthGuard)
export class SubjectsController {
    constructor(private subjectService: SubjectService) {}

    @Get()
    async getUserSubjects(@Req() req: Request) {
        const userData = req.params.userData;
        const userId = userData["id"];
        const userSubjects = await this.subjectService.getUserSubjects(userId);
        return userSubjects;
    }

    @Get(':id')
    async getSubject(@Req() req: Request, @Param() params) {
        const userData = req.params.userData;
        const userId = userData['id'];
        const subjectId = params.id;

        const subject = await this.subjectService.getById(subjectId);
        const isModerator = await this.subjectService.isSubjectModerator(subject, userId);
        const { id, name, creatorId } = subject;
        if(isModerator) {
            return { id, name, creatorId };
        } else {
            throw new UnauthorizedException;
        }
        
    }

    @Post()
    async createSubject(@Body() body, @Req() req: Request) {
        const userData = req.params.userData;
        await this.subjectService.createSubject(body.name, body.description, userData['id']);
        return;
    }
    
}
function Params() {
    throw new Error('Function not implemented.');
}

