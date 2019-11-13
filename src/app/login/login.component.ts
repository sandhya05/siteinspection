import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName;
  passWord;

  login() {
    this.routerService.navigate(['/spa']);
  }
  constructor(private routerService:Router) { }
}
