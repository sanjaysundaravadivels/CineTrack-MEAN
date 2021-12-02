import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyfeaturesComponent } from './keyfeatures.component';

describe('KeyfeaturesComponent', () => {
  let component: KeyfeaturesComponent;
  let fixture: ComponentFixture<KeyfeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeyfeaturesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyfeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
