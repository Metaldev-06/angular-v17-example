import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipboardButtonComponent } from './clipboard-button.component';

describe('ClipboardButtonComponent', () => {
  let component: ClipboardButtonComponent;
  let fixture: ComponentFixture<ClipboardButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClipboardButtonComponent]
    });
    fixture = TestBed.createComponent(ClipboardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
