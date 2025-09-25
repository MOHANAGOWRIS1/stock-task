import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackStock } from './track-stock';

describe('TrackStock', () => {
  let component: TrackStock;
  let fixture: ComponentFixture<TrackStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackStock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackStock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
