import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogForm: FormGroup;
  username;
  posts;

  constructor(
    private router: Router,
    private flashMessages: FlashMessagesService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private blogService: BlogService
  ) {
    this.createBlogForm();
  }


  createBlogForm() {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      message: ['', Validators.required]
    });
  }


  blogFormSubmit() {
    const post = {
      title: this.blogForm.get('title').value,
      message: this.blogForm.get('message').value,
      creator: this.username
    };

    this.blogService.newPost(post).subscribe(result => {
      if (!result.success) {
        this.flashMessages.show(result.message, {cssClass: 'alert-danger', timeout: 4000});
      }else {
        this.flashMessages.show(result.message, {cssClass: 'alert-success', timeout: 4000});
      }
    });
  }
  goBack() {
    window.location.reload();
  }

  ngOnInit() {

    this.blogService.getAllPosts().subscribe(result => {
      this.posts = result.posts;
      console.log(this.posts);
    });
    
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
    });
  }

}
