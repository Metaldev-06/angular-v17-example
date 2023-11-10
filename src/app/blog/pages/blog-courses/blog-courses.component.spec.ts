import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCoursesComponent } from './blog-courses.component';

describe('BlogCoursesComponent', () => {
  let component: BlogCoursesComponent;
  let fixture: ComponentFixture<BlogCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogCoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
