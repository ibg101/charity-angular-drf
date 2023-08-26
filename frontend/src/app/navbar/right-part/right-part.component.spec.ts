import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightPartComponent } from './right-part.component';

describe('RightPartComponent', () => {
  let component: RightPartComponent;
  let fixture: ComponentFixture<RightPartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightPartComponent]
    });
    fixture = TestBed.createComponent(RightPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
