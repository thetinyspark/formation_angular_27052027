import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  public isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  public login(username: string, password: string): boolean {
    if (username == "admin" && password == "admin") {
      localStorage.setItem('loggedIn', 'true');
      return true;
    }
    return false;
  }
}
