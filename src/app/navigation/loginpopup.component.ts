import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';

@Component({
  selector: 'app-loginpopup',
  templateUrl: './loginpopup.component.html',
  styleUrls: ['./loginpopup.component.css']
})
export class LoginpopupComponent implements OnInit {

  loginForm: FormGroup;
  isLoading = false;
  private loadingSubs: Subscription;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private authService: AuthService, private uiService: UIService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      isLoading => {this.isLoading = isLoading;}
    );
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required]})
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
   });
   this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
   });
  }

  onSubmit() {
    this.authService.login({
      email: this.firstFormGroup.value.firstCtrl,
      password: this.secondFormGroup.value.secondCtrl
      // email: this.loginForm.value.email,
      // password: this.loginForm.value.password
    })
  }

  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }

}
