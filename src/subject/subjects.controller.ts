import { Body, Controller, Get, Logger, Post, Req, UseGuards } from '@nestjs/common';
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
        Logger.log('start')
        const userSubjects = await this.subjectService.getUserSubjects(userId);
        Logger.log(userSubjects);
        return userSubjects;
    }

    @Post()
    createSubject(@Body() body, @Req() req: Request): void {
        const userData = req.params.userData;
        this.subjectService.createSubject(body.name, body.description, userData["id"]);
    }
    
}
