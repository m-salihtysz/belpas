import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Haberler } from './haberler';

describe('Haberler', () => {
  let component: Haberler;
  let fixture: ComponentFixture<Haberler>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Haberler],
    }).compileComponents();

    fixture = TestBed.createComponent(Haberler);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});