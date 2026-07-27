import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Komisyon } from './komisyon';

describe('Komisyon', () => {
  let component: Komisyon;
  let fixture: ComponentFixture<Komisyon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Komisyon],
    }).compileComponents();

    fixture = TestBed.createComponent(Komisyon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
