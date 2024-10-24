import { Component } from '@angular/core';
import { ILogin } from '../../../models/i-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

loginData!:ILogin

}
