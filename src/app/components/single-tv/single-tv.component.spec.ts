import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTvComponent } from './single-tv.component';

describe('SingleTvComponent', () => {
  let component: SingleTvComponent;
  let fixture: ComponentFixture<SingleTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
