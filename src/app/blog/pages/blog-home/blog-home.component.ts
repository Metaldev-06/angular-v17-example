import { NgStyle, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import {
  Pagination,
  PostDatum,
} from '@src/app/core/interfaces/post-data/post-data';
import { BlogDataService } from '@src/app/core/services/blog-data/blog-data.service';
import { i18nService } from '@src/app/core/services/transloco/i18n.service';
import { CardPostComponent } from '@src/app/shared/card-post/card-post.component';
import { SkeletonPostCardComponent } from '@src/app/shared/skeleton-post-card/skeleton-post-card.component';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-blog-home',
  standalone: true,
  imports: [
    CardPostComponent,
    SkeletonModule,
    NgStyle,
    SkeletonPostCardComponent,
    TranslocoPipe,
    TitleCasePipe,
  ],
  templateUrl: './blog-home.component.html',
  styleUrl: './blog-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogHomeComponent {
  public posts = signal<PostDatum[]>([]);
  public page = signal<Pagination>({} as Pagination);
  public showButtonPage = signal<boolean>(true);
  public selectedLanguage = signal<string>('');

  private readonly blogDataService = inject(BlogDataService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly i18nService = inject(i18nService);

  ngOnInit(): void {
    this.selectedLanguage.set(this.i18nService.getCurrentLanguage());
    this.getPosts();

    document.documentElement.scrollTop = 0;
  }

  getPosts(page = 1) {
    this.blogDataService.blogData$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.posts.set(res.data);
        this.page.set(res.meta?.pagination);

        if (this.page().page === this.page().pageCount) {
          this.showButtonPage.set(false);
        }
      });

    if (this.posts()) {
      return;
    }

    this.blogDataService
      .getPosts(page, this.selectedLanguage())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.posts.set(res.data);
        this.blogDataService.setBlogData(res);
        this.page.set(res.meta.pagination);

        if (this.page().page === this.page().pageCount) {
          this.showButtonPage.set(false);
        }
      });
  }

  nextPage() {
    this.page.update((prev) => ({ ...prev, page: prev.page + 1 }));

    if (this.page().page === this.page().pageCount) {
      this.showButtonPage.set(false);
    }

    if (this.page().page > this.page().pageCount) {
      this.showButtonPage.set(false);
      return;
    }

    this.blogDataService
      .getPosts(this.page().page, this.selectedLanguage())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.posts.update((prev) => [...prev, ...res.data]);
      });
  }
}
