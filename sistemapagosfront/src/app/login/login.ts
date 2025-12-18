import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    public loginForm!:FormGroup;

    constructor(private formBuilder:FormBuilder) {
    }
    ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        username: this.formBuilder.control(''),
        password: this.formBuilder.control('')
      })
    }
    login():void {
      let username = this.loginForm.value.username;
      let password = this.loginForm.value.password;
    }
}
