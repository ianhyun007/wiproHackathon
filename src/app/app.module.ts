import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/spinner.reducer';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthModule } from './auth/auth.module'
import { LoginpopupComponent } from './navigation/loginpopup.component';
import { SigninpopupComponent } from './navigation/signinpopup.component';
import { UIService } from './shared/ui.service';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './auth/auth.service';
import { CreateHackathonComponent } from './navigation/create-hackathon.component';
import { HttpClientModule } from "@angular/common/http";
import { WelcomeModule } from './welcome/welcome.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    LoginpopupComponent,
    SigninpopupComponent,
    CreateHackathonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AuthModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    WelcomeModule,
    // StoreModule.forRoot({
    //   userlogin: reducer
    // })
    StoreModule.forRoot({ spinner: reducer })
  ],
  providers: [AuthService, UIService],
  bootstrap: [AppComponent],
  entryComponents: [LoginpopupComponent, SigninpopupComponent,CreateHackathonComponent]
  
})
export class AppModule { }
