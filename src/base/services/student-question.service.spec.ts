import { Test, TestingModule } from '@nestjs/testing';
import { StudentQuestionService } from './student-question.service';

describe('StudentQuestionService', () => {
  let service: StudentQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentQuestionService],
    }).compile();

    service = module.get<StudentQuestionService>(StudentQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
