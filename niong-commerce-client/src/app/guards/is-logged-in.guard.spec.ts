import { inject, TestBed } from '@angular/core/testing';

import { IsLoggedInGuard } from './is-logged-in.guard';
import { Router, RouterStateSnapshot } from '@angular/router';
import { currentUser$ } from '../services/auth.subjects';
import { take } from 'rxjs/operators';
import { User } from '../models/user';

describe('IsLoggedInGuard', () => {
  const routerMock = {navigate: jasmine.createSpy('navigate')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsLoggedInGuard, {provide: Router, useValue: routerMock}]
    });
  });

  it('should canActive if currentUser$ is not null', done => inject([IsLoggedInGuard], (guard: IsLoggedInGuard) => {
    expect(guard).toBeTruthy();

    currentUser$.next(null);
    guard.canActivate(null, {url: 'test'} as RouterStateSnapshot).pipe(take(1)).subscribe(result => {
      expect(result).toEqual(false);
      expect(routerMock.navigate).toHaveBeenCalledWith(['login'], {replaceUrl: true, queryParams: {redirectUrl: 'test'}});
    });

    currentUser$.next({} as User);
    guard.canActivate(null, null).pipe(take(1)).subscribe(result => {
      expect(result).toEqual(true);
      done();
    });
  })());
});
