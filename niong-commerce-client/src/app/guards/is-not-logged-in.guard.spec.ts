import { TestBed, async, inject } from '@angular/core/testing';

import { IsNotLoggedInGuard } from './is-not-logged-in.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { currentUser$ } from '../services/auth.subjects';
import { take } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from '@angular/router';

describe('IsNotLoggedInGuard', () => {
  const routerMock = {navigateByUrl: jasmine.createSpy('navigate')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsNotLoggedInGuard, {provide: Router, useValue: routerMock}]
    });
  });

  it('should canActive if currentUser$ is null', done => inject([IsNotLoggedInGuard], (guard: IsNotLoggedInGuard) => {
    expect(guard).toBeTruthy();

    currentUser$.next(null);
    guard.canActivate().pipe(take(1)).subscribe(result => {
      expect(result).toEqual(true);
    });

    currentUser$.next({} as User);
    guard.canActivate().pipe(take(1)).subscribe(result => {
      expect(result).toEqual(false);
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/dashboard', {replaceUrl: true});
      done();
    });
  })());
});
