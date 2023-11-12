import { DatePipe, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MarkdownModule } from 'ngx-markdown';

import { BlogDataService } from '@src/app/core/services/blog-data/blog-data.service';
import { ClipboardButtonComponent } from '@src/app/shared/clipboard-button/clipboard-button.component';
import { DatumAttributes } from '@src/app/core/interfaces/post-data/post-data';
import { LoaderComponent } from '@src/app/shared/loader/loader.component';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [
    TitleCasePipe,
    DatePipe,
    MarkdownModule,
    ClipboardButtonComponent,
    LoaderComponent,
  ],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostComponent {
  @Input() public slug = '';

  public post = signal<DatumAttributes>({} as DatumAttributes);
  public readonly clipboardButton = ClipboardButtonComponent;

  private readonly blogDataService = inject(BlogDataService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.blogDataService
      .getPostBySlug(this.slug)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.post.set(res.data[0].attributes);
      });

    document.documentElement.scrollTop = 0;
  }
}
