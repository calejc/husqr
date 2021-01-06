import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HusqrComponent } from './husqr.component';

describe('HusqrComponent', () => {
  let component: HusqrComponent;
  let fixture: ComponentFixture<HusqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HusqrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HusqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
