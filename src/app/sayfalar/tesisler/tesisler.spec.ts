import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tesisler } from './tesisler';

describe('Tesisler', () => {
  let component: Tesisler;
  let fixture: ComponentFixture<Tesisler>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tesisler],
    }).compileComponents();

    fixture = TestBed.createComponent(Tesisler);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
