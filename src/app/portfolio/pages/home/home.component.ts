import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { AboutMeSectionComponent } from './components/about-me-section/about-me-section.component';
import { DataAttributes } from '@src/app/core/interfaces/home-data/home-data';
import { HomeDataService } from '@src/app/core/services/home-data/home-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';
import { BlogsSectionComponent } from './components/blogs-section/blogs-section.component';
import { LoaderComponent } from '@src/app/shared/loader/loader.component';
import { SkeletonPostCardComponent } from '@src/app/shared/skeleton-post-card/skeleton-post-card.component';
import { RouterLink } from '@angular/router';
import { TitleComponent } from '@src/app/shared/title/title.component';
import { SkeletonCardImageComponent } from '@src/app/shared/skeleton-card-image/skeleton-card-image.component';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    AboutMeSectionComponent,
    ProjectsSectionComponent,
    BlogsSectionComponent,
    LoaderComponent,
    SkeletonPostCardComponent,
    TitleComponent,
    RouterLink,
    SkeletonCardImageComponent,
    TranslocoPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public userData = signal<DataAttributes>({} as DataAttributes);

  private readonly homeDataService = inject(HomeDataService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getData();

    document.documentElement.scrollTop = 0;
  }

  getData() {
    this.homeDataService.homeData$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((resp) => {
        this.userData.set(resp);
      });
  }
}
