import { Module } from '@nestjs/common';
import { ExamResultService } from './exam-result/exam-result.service';

@Module({
    providers: [ ExamResultService ],
    exports: [ ExamResultService ]
})
export class SharedModule {}
