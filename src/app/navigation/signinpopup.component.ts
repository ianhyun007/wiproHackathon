import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
// import { UIService } from '../../shared/ui.service';
import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-signinpopup',
  templateUrl: './signinpopup.component.html',
  styleUrls: ['./signinpopup.component.css']
})
export class SigninpopupComponent implements OnInit {
  maxDate;
  isLoading = false;
  private loadingSubs: Subscription;
  form: FormGroup;

  constructor(private authService: AuthService) {}
  // constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
    //   isLoading => {this.isLoading = isLoading;}
    // );

    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, { 
        validators: [Validators.required, Validators.minLength(6)] 
      }),
      birthdate: new FormControl(null, { 
        validators: [Validators.required] 
      }),
      
      // image: new FormControl(null, {
      //   validators: [Validators.required],
      //   asyncValidators: [mimeType]
      // })
    });

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {
    // if (this.loadingSubs) {
    //   this.loadingSubs.unsubscribe();
    // }
  }
}