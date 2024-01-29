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
import { TranslocoPipe } from '@ngneat/transloco';
import { i18nService } from '@src/app/core/services/transloco/i18n.service';

@Component({
  selector: 'app-blog-courses',
  standalone: true,
  imports: [SkeletonPostCardComponent, TranslocoPipe],
  templateUrl: './blog-courses.component.html',
  styleUrl: './blog-courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogCoursesComponent {
  public courses = signal<Datum[]>([]);
  public selectedLanguage = signal<string>('');

  private readonly blogDataService = inject(BlogDataService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly i18nService = inject(i18nService);

  ngOnInit(): void {
    this.selectedLanguage.set(this.i18nService.getCurrentLanguage());
    this.getCourses();

    document.documentElement.scrollTop = 0;
  }

  getCourses() {
    if (sessionStorage.getItem('courses')) {
      this.courses.set(JSON.parse(sessionStorage.getItem('courses')!));
      return;
    }

    this.blogDataService
      .getCoursesByYoutube(this.selectedLanguage())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.courses.set(res.data);

        sessionStorage.setItem('courses', JSON.stringify(res.data));
      });
  }
}
