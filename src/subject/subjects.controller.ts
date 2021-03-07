import { Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { Request } from 'express';
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
    createSubject(@Body() body): void {
        this.subjectService.createSubject(body.name);
    }
    
}