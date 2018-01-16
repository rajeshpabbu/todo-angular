import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { UserService } from '../services/user.service';

@Injectable()
export class AuthenticationService {
    constructor(
        private http: HttpClient,
        private us: UserService
    ) { }

    login(username: string, password: string) {
        return this.http.post<any>('/api/authenticate', { username: username, password: password })
            .map(user => {
                console.log(user)
                if (user ) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    

                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}