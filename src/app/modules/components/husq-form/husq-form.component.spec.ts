import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HusqFormComponent } from './husq-form.component';

describe('HusqFormComponent', () => {
  let component: HusqFormComponent;
  let fixture: ComponentFixture<HusqFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HusqFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HusqFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
