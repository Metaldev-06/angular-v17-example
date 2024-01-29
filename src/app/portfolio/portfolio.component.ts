import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DataAttributes } from '../core/interfaces/home-data/home-data';
import { HomeDataService } from '../core/services/home-data/home-data.service';
import { LoaderComponent } from '../shared/loader/loader.component';
import { i18nService } from '../core/services/transloco/i18n.service';
import { BlogDataService } from '../core/services/blog-data/blog-data.service';
import { PostData } from '../core/interfaces/post-data/post-data';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent, LoaderComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  public loading = signal<boolean>(false);

  public userData = signal<DataAttributes>({} as DataAttributes);
  public latestPost = signal<PostData>({} as PostData);
  public selectedLanguage = signal<string>('');

  private readonly homeDataService = inject(HomeDataService);
  private readonly blogDataService = inject(BlogDataService);
  private readonly i18nService = inject(i18nService);

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.selectedLanguage.set(this.i18nService.getCurrentLanguage());

    this.loading.set(true);
    this.homeDataService.homeData$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((resp) => {
        this.userData.set(resp);
        this.loading.set(false);
        console.log(resp);
      });

    if (Object.keys(this.userData()).length === 0) {
      this.homeDataService
        .getData(this.selectedLanguage())
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (resp) => {
            this.homeDataService.setHomeData(resp.data.attributes);
            this.loading.set(false);
          },
          error: (error) => {
            console.error(error);
            this.loading.set(false);
          },
          complete: () => {
            this.loading.set(false);
          },
        });
    }

    this.blogDataService.latestPostData$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((resp) => {
        this.latestPost.set(resp);
      });

    if (Object.keys(this.latestPost()).length === 0) {
      this.blogDataService
        .getLatestPosts(this.selectedLanguage())
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (resp) => {
            this.blogDataService.setLatestPostData(resp);
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => {},
        });
    }
  }
}
