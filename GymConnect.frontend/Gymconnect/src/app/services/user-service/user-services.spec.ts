import { TestBed } from '@angular/core/testing';
import { UserService } from './user-service';


describe('UserServices', () => {
  let UserServices: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    UserServices = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(UserServices).toBeTruthy();
  });
});
