import { first, map } from 'rxjs/operators';
import { User } from '../models/user';
import { ReplaySubject } from 'rxjs';

export const currentUser$ = new ReplaySubject<User | null>(1);

export function getCurrentUser() {
  return currentUser$.pipe(first()).toPromise();
}

export const loggedIn$ = currentUser$.pipe(map(cu => !!cu));
