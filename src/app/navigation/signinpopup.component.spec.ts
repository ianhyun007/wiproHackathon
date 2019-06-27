import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninpopupComponent } from './signinpopup.component';

describe('SigninpopupComponent', () => {
  let component: SigninpopupComponent;
  let fixture: ComponentFixture<SigninpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
