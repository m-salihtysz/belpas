import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Surec } from './surec';

describe('Surec', () => {
  let component: Surec;
  let fixture: ComponentFixture<Surec>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Surec],
    }).compileComponents();

    fixture = TestBed.createComponent(Surec);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
