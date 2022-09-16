import { inject, TestBed } from '@angular/core/testing';

import { IsLoggedInGuard } from './is-logged-in.guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { currentUser$ } from '../services/auth.subjects';
import { first } from 'rxjs/operators';
import { User } from '../models/user';

describe('IsLoggedInGuard', () => {
  const routerMock = {navigate: jest.fn()};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsLoggedInGuard, {provide: Router, useValue: routerMock}]
    });
  });

  it('should canActive if currentUser$ is not null', done => inject([IsLoggedInGuard], (guard: IsLoggedInGuard) => {
    expect(guard).toBeTruthy();

    currentUser$.next(null);
    guard.canActivate(new ActivatedRouteSnapshot(), {url: 'test'} as RouterStateSnapshot).pipe(first()).subscribe(result => {
      expect(result).toBe(false);
      expect(routerMock.navigate).toHaveBeenCalledWith(['login'], {replaceUrl: true, queryParams: {redirectUrl: 'test'}});
    });

    currentUser$.next({} as User);
    guard.canActivate(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot).pipe(first()).subscribe(result => {
      expect(result).toBe(true);
      done();
    });
  })());
});
