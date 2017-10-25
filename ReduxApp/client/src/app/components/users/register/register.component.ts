import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {
    name: '',
    password: '',
    confirmPassword: '',
    email: ''
  };
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onRegister() {
    console.log(this.user);
    this.auth.register(this.user).subscribe(res => {
      console.log(res);
    });
  }

}
