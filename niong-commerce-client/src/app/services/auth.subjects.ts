import { map, take } from 'rxjs/operators';
import { User } from '../models/user';
import { ReplaySubject } from 'rxjs';

export const currentUser$ = new ReplaySubject<User>(1);

export function getCurrentUser() {
  return currentUser$.pipe(take(1)).toPromise();
}

export const loggedIn$ = currentUser$.pipe(map(cu => !!cu));
