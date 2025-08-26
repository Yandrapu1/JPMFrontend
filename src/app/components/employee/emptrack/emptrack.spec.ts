import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emptrack } from './emptrack';

describe('Emptrack', () => {
  let component: Emptrack;
  let fixture: ComponentFixture<Emptrack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Emptrack]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Emptrack);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
