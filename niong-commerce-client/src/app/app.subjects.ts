import { map } from 'rxjs/operators';
import { User } from './models/user';
import { ReplaySubject } from 'rxjs';

export const currentUser$ = new ReplaySubject<User>(1);

export const loggedIn$ = currentUser$.pipe(map(cu => !!cu));
