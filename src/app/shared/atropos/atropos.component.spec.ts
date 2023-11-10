import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtroposComponent } from './atropos.component';

describe('AtroposComponent', () => {
  let component: AtroposComponent;
  let fixture: ComponentFixture<AtroposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AtroposComponent]
    });
    fixture = TestBed.createComponent(AtroposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
