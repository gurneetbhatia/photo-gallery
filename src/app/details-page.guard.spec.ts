import { TestBed } from '@angular/core/testing';

import { DetailsPageGuard } from './details-page.guard';

describe('DetailsPageGuard', () => {
  let guard: DetailsPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DetailsPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
