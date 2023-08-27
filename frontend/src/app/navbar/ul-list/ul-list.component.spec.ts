import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlListComponent } from './ul-list.component';

describe('UlListComponent', () => {
  let component: UlListComponent;
  let fixture: ComponentFixture<UlListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UlListComponent]
    });
    fixture = TestBed.createComponent(UlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
