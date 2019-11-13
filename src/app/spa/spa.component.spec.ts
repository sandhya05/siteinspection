import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SPAComponent } from './spa.component';

describe('SPAComponent', () => {
  let component: SPAComponent;
  let fixture: ComponentFixture<SPAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SPAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SPAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
