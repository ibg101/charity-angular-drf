import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiLineComponent } from './ui-line.component';

describe('UiLineComponent', () => {
  let component: UiLineComponent;
  let fixture: ComponentFixture<UiLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UiLineComponent]
    });
    fixture = TestBed.createComponent(UiLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
