import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ilanlar } from './ilanlar';

describe('Ilanlar', () => {
  let component: Ilanlar;
  let fixture: ComponentFixture<Ilanlar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ilanlar],
    }).compileComponents();

    fixture = TestBed.createComponent(Ilanlar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
