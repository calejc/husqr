import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HusqCardComponent } from './husq-card.component';

describe('HusqCardComponent', () => {
  let component: HusqCardComponent;
  let fixture: ComponentFixture<HusqCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HusqCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HusqCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
