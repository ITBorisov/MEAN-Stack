import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  };
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  registerFormSubmit() {
    this.authService.registerUser(this.user).subscribe(result => {
      console.log(result);
    });
  }

}
