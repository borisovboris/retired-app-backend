import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('subjects')
export class SubjectsController {
    @Get()
    getAllSubjects(@Req() request: Request): Array<string> {
        return ['Math', 'History', 'English', 'Geography'];
    }
}
