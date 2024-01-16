import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  CertificationsDatum,
  EducationsDatum,
} from '@src/app/core/interfaces/home-data/home-data';
import { HomeDataService } from '@src/app/core/services/home-data/home-data.service';
import { AtroposComponent } from '@src/app/shared/atropos/atropos.component';
import { SkeletonCardImageComponent } from '@src/app/shared/skeleton-card-image/skeleton-card-image.component';

import { TitleComponent } from '@src/app/shared/title/title.component';
import { TimelineComponent } from './components/timeline/timeline.component';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [
    AtroposComponent,
    SkeletonCardImageComponent,
    TitleComponent,
    TimelineComponent,
  ],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationComponent {
  public certifications = signal<CertificationsDatum[]>([]);
  public educations = signal<EducationsDatum[]>([]);

  private readonly destroyRef = inject(DestroyRef);
  private readonly homeDataService = inject(HomeDataService);

  ngOnInit(): void {
    this.getCertifications();

    document.documentElement.scrollTop = 0;
  }

  getCertifications() {
    this.homeDataService.homeData$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((resp) => {
        this.certifications.set(resp.certifications?.data);
        this.educations.set(resp.educations?.data);
      });
  }
}
