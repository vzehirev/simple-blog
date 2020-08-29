import { TestBed } from '@angular/core/testing';

import { NotLoggedUserGuard } from './not-logged-user.guard';

describe('NotLoggedUserGuard', () => {
  let guard: NotLoggedUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotLoggedUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
