import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Empbooking } from './empbooking';

describe('Empbooking', () => {
  let component: Empbooking;
  let fixture: ComponentFixture<Empbooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Empbooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Empbooking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
