import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonCardImageComponent } from './skeleton-card-image.component';

describe('SkeletonCardImageComponent', () => {
  let component: SkeletonCardImageComponent;
  let fixture: ComponentFixture<SkeletonCardImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonCardImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkeletonCardImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
