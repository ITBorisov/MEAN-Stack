import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ],
      confirm:  ['', Validators.required ],
      email:    ['', Validators.required ],
    });
  }


  ngOnInit() {
  }

  registerFormSubmit() {
    const user = {
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value,
      email: this.registerForm.get('email').value
    };

    this.authService.registerUser(user).subscribe(result => {
      console.log(result);
    });

    this.registerForm.reset();
  }

}
