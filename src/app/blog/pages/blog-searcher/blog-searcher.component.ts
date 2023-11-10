import { DatePipe, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Datum } from '@src/app/core/interfaces/course-data/course-data';
import { PostDatum } from '@src/app/core/interfaces/post-data/post-data';
import { BlogDataService } from '@src/app/core/services/blog-data/blog-data.service';

@Component({
  selector: 'app-blog-searcher',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, RouterLink],
  templateUrl: './blog-searcher.component.html',
  styleUrl: './blog-searcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogSearcherComponent {
  public posts = signal<PostDatum[]>([]);
  public courses = signal<Datum[]>([]);
  public query = signal<string>('');

  private readonly route = inject(ActivatedRoute);
  private readonly blogDataService = inject(BlogDataService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getQueryParams();

    document.documentElement.scrollTop = 0;
  }

  private getQueryParams(): void {
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.query.set(params['query']);

        this.searcher(this.query());
      });
  }

  private searcher(query: string) {
    this.blogDataService
      .searchPost(query)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.posts.set(res.data);
      });

    this.blogDataService
      .searchCourse(query)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.courses.set(res.data);
      });
  }
}
