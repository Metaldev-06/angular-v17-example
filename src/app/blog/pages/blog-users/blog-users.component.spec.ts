import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogUsersComponent } from './blog-users.component';

describe('BlogUsersComponent', () => {
  let component: BlogUsersComponent;
  let fixture: ComponentFixture<BlogUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
