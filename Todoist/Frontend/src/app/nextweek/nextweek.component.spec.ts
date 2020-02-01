import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextweekComponent } from './nextweek.component';

describe('NextweekComponent', () => {
  let component: NextweekComponent;
  let fixture: ComponentFixture<NextweekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextweekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
