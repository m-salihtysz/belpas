import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ihaleler } from './ihaleler';

describe('Ihaleler', () => {
  let component: Ihaleler;
  let fixture: ComponentFixture<Ihaleler>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ihaleler],
    }).compileComponents();

    fixture = TestBed.createComponent(Ihaleler);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
