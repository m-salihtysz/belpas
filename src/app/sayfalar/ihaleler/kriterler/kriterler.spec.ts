import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kriterler } from './kriterler';

describe('Kriterler', () => {
  let component: Kriterler;
  let fixture: ComponentFixture<Kriterler>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kriterler],
    }).compileComponents();

    fixture = TestBed.createComponent(Kriterler);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
