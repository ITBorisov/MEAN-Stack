import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private flashMessages: FlashMessagesService
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ],
      confirm:  ['', Validators.required ],
      email:    ['', Validators.required ],
    }, { validator: this.matchPasswords('password', 'confirm')});
  }

  registerFormSubmit() {
    const user = {
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value,
      email: this.registerForm.get('email').value
    };
    this.authService.registerUser(user).subscribe(result => {
      if (!result.success) {
        this.flashMessages.show(result.message, {cssClass: 'alert-danger', timeout: 4000});
      }else {
        this.flashMessages.show(result.message, {cssClass: 'alert-success', timeout: 4000});
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }
    });
    this.registerForm.reset();
  }

  matchPasswords(password, confirm) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return { 'matchPasswords': true };
      }
    };
  }

  ngOnInit() {

  }

}
