import { TestBed } from '@angular/core/testing';

import { StudentDetailGuard } from './student-detail.guard';

describe('StudentDetailGuard', () => {
  let guard: StudentDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StudentDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
