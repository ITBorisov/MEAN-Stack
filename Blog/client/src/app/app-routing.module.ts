import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/noAuth.guard';
const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'blog', component: BlogComponent},
    { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard]},
    { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
    imports: [(RouterModule.forRoot(routes))],
    exports: [RouterModule]
})


export class AppRoutingModule { }
