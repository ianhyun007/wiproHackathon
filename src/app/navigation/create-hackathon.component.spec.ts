import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHackathonComponent } from './create-hackathon.component';

describe('CreateHackathonComponent', () => {
  let component: CreateHackathonComponent;
  let fixture: ComponentFixture<CreateHackathonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHackathonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHackathonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
