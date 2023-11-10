import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonPostCardComponent } from './skeleton-post-card.component';

describe('SkeletonPostCardComponent', () => {
  let component: SkeletonPostCardComponent;
  let fixture: ComponentFixture<SkeletonPostCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkeletonPostCardComponent]
    });
    fixture = TestBed.createComponent(SkeletonPostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
