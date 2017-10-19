import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private flashMessages: FlashMessagesService
  ) {
      this.createForm();
    }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ],
    });

  }

  loginFormSubmit() {
    const user = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    };
    console.log(user);
    this.authService.loginUser(user).subscribe(result => {
      if (!result.success) {
        this.flashMessages.show(result.message, {cssClass: 'alert-danger', timeout: 4000});
      }else {
        localStorage.setItem('token', result.token );
        localStorage.setItem('user', result.user);

        this.flashMessages.show(result.message, {cssClass: 'alert-success', timeout: 4000});
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      }
    });
  }

  ngOnInit() {
  }

}
