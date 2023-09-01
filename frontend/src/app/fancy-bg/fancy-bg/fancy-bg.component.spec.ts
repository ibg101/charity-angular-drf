import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyBgComponent } from './fancy-bg.component';

describe('FancyBgComponent', () => {
  let component: FancyBgComponent;
  let fixture: ComponentFixture<FancyBgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FancyBgComponent]
    });
    fixture = TestBed.createComponent(FancyBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
