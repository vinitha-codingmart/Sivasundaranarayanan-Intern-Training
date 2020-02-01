import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopIconsComponent } from './top-icons.component';

describe('TopIconsComponent', () => {
  let component: TopIconsComponent;
  let fixture: ComponentFixture<TopIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
