import { Body, Controller, Get, Logger, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ModeratorGuard } from 'src/auth/moderator.guard';
import { SubjectService } from '../base/services/subject.service';

@UseGuards(AuthGuard)
@Controller('subjects')
export class SubjectsController {
    constructor(private subjectService: SubjectService) {}

    @Get()
    async getSubjects(@Req() req: Request) {
        const userData = req.params.userData;
        const userId = userData["id"];
        const userSubjects = await this.subjectService.getUserSubjects(userId);
        return userSubjects;
    }

    @Get(':id/teachers')
    async getSubjectTeachers(@Req() req: Request, @Param() params) {
        const userData = req.params.userData;
        const userId = userData['id'];
        const subjectId = params.id;

        const isModerator = await this.subjectService.isSubjectModerator(subjectId, userId);

        if(isModerator) {
            const subjectTeachers = await this.subjectService.getSubjectTeachers(subjectId);
            return subjectTeachers;
        } else {
            throw new UnauthorizedException;
        }
    }

    @Get(':id')
    async getSubject(@Req() req: Request, @Param() params) {
        const userData = req.params.userData;
        const userId = userData['id'];
        const subjectId = params.id;

        const isModerator = await this.subjectService.isSubjectModerator(subjectId, userId);
        
        if(isModerator) {
            const subject = await this.subjectService.getById(subjectId);
            const { id, name, creatorId } = subject;
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


