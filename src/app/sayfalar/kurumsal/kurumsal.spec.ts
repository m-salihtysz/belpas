import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kurumsal } from './kurumsal';

describe('Kurumsal', () => {
  let component: Kurumsal;
  let fixture: ComponentFixture<Kurumsal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kurumsal],
    }).compileComponents();

    fixture = TestBed.createComponent(Kurumsal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
