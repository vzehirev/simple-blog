import { TestBed } from '@angular/core/testing';

import { LoggedUserGuard } from './logged-user.guard';

describe('TestGuardGuard', () => {
  let guard: LoggedUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
