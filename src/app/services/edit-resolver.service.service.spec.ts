import { TestBed } from '@angular/core/testing';

import { EditResolver.ServiceService } from './edit-resolver.service.service';

describe('EditResolver.ServiceService', () => {
  let service: EditResolver.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditResolver.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
