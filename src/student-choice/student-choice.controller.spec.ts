import { Test, TestingModule } from '@nestjs/testing';
import { StudentChoiceController } from './student-choice.controller';

describe('StudentChoiceController', () => {
  let controller: StudentChoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentChoiceController],
    }).compile();

    controller = module.get<StudentChoiceController>(StudentChoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
