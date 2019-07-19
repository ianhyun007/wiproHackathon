import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginpopupComponent } from './navigation/loginpopup.component';
import { SigninpopupComponent } from './navigation/signinpopup.component';

import { WelcomeModule } from './welcome/welcome.module';
// import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', pathMatch:'prefix', redirectTo: 'wel/charts'},
  { path: 'wel', loadChildren: () => WelcomeModule },
  { path: 'signup', component: SigninpopupComponent },
  { path: 'login', component: LoginpopupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }