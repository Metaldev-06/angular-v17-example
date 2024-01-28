import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import { PostDatum } from '@src/app/core/interfaces/post-data/post-data';
import { BlogDataService } from '@src/app/core/services/blog-data/blog-data.service';
import { CardPostComponent } from '@src/app/shared/card-post/card-post.component';
import { SkeletonPostCardComponent } from '@src/app/shared/skeleton-post-card/skeleton-post-card.component';
import { TitleComponent } from '@src/app/shared/title/title.component';

@Component({
  selector: 'app-blogs-section',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TitleComponent,
    RouterLink,
    CardPostComponent,
    SkeletonPostCardComponent,
    TranslocoPipe,
  ],
  templateUrl: './blogs-section.component.html',
  styleUrl: './blogs-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogsSectionComponent {
  public posts = signal<PostDatum[]>([]);

  private readonly blogDataService = inject(BlogDataService);

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.blogDataService.latestPostData$.subscribe({
      next: (resp) => {
        this.posts.set(resp.data);
      },
    });
  }
}
