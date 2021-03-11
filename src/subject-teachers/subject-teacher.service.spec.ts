import { Test, TestingModule } from '@nestjs/testing';
import { SubjectTeacherService } from './subject-teacher.service';

describe('SubjectTeacherService', () => {
  let service: SubjectTeacherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjectTeacherService],
    }).compile();

    service = module.get<SubjectTeacherService>(SubjectTeacherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
