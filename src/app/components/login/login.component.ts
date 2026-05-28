import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private _loginService: LoginService = inject(LoginService);
  public isLoggedIn: boolean = false;

  public onLogin(): void {
    this.isLoggedIn = this._loginService.login("admin", "admin");
  }
}
