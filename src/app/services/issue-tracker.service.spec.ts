import { TestBed } from '@angular/core/testing';

import { IssueTrackerService } from './issue-tracker.service';

describe('IssueTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IssueTrackerService = TestBed.get(IssueTrackerService);
    expect(service).toBeTruthy();
  });
});
