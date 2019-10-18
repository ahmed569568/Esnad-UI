import { TestBed } from '@angular/core/testing';
import { UsersService } from '@app/users-feature/users.service';

describe('UsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersService = TestBed.get(UsersService);
    expect(service).toBeTruthy();
  });
});
