import { TestBed } from '@angular/core/testing';

import { NotArticleCreatorGuard } from './not-article-creator.guard';

describe('NotArticleCreatorGuard', () => {
  let guard: NotArticleCreatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotArticleCreatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
