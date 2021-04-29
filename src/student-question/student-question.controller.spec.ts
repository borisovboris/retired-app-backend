import { Test, TestingModule } from '@nestjs/testing';
import { StudentQuestionController } from './student-question.controller';

describe('StudentQuestionController', () => {
  let controller: StudentQuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentQuestionController],
    }).compile();

    controller = module.get<StudentQuestionController>(StudentQuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
