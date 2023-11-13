import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Datum } from '@src/app/core/interfaces/course-data/course-data';
import { BlogDataService } from '@src/app/core/services/blog-data/blog-data.service';
import { SkeletonPostCardComponent } from '../../../shared/skeleton-post-card/skeleton-post-card.component';

@Component({
  selector: 'app-blog-courses',
  standalone: true,
  imports: [SkeletonPostCardComponent],
  templateUrl: './blog-courses.component.html',
  styleUrl: './blog-courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogCoursesComponent {
  public courses = signal<Datum[]>([]);

  private readonly blogDataService = inject(BlogDataService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getCourses();

    document.documentElement.scrollTop = 0;
  }

  getCourses() {
    if (sessionStorage.getItem('courses')) {
      this.courses.set(JSON.parse(sessionStorage.getItem('courses')!));
      return;
    }

    this.blogDataService
      .getCoursesByYoutube()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.courses.set(res.data);

        sessionStorage.setItem('courses', JSON.stringify(res.data));
      });
  }
}
