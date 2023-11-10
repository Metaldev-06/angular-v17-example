import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSearcherComponent } from './blog-searcher.component';

describe('BlogSearcherComponent', () => {
  let component: BlogSearcherComponent;
  let fixture: ComponentFixture<BlogSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogSearcherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
