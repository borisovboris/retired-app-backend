import { Body, Controller, Get, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { SubjectService } from './subject.service';

@Controller('subjects')
export class SubjectsController {
    constructor(private subjectService: SubjectService) {

    }
    @Get()
    getAllSubjects(@Req() request: Request): Array<string> {
        return ['Math', 'History', 'English', 
        'Geography', 'Something', 'Something',
        'Something', 'Something'];
    }

    @Post()
    @UseGuards(AuthGuard)
    createSubject(@Body() body, @Req() req: Request): void {
        const userData = req.params.userData;
        this.subjectService.createSubject(body.name, body.description, userData["id"]);
    }
    
}
