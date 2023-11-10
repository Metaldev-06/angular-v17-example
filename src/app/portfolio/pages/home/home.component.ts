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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    AboutMeSectionComponent,
    ProjectsSectionComponent,
    BlogsSectionComponent,
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
