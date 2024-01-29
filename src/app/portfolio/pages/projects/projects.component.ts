import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe } from '@ngneat/transloco';
import {
  ProjectsDatum,
  TentacledAttributes,
} from '@src/app/core/interfaces/home-data/home-data';
import { HomeDataService } from '@src/app/core/services/home-data/home-data.service';
import { DialogComponent } from '@src/app/shared/dialog/dialog.component';
import { ImagePipe } from '@src/app/shared/pipes/image-pipe/image-pipe.pipe';
import { SkeletonCardImageComponent } from '@src/app/shared/skeleton-card-image/skeleton-card-image.component';
import { TitleComponent } from '@src/app/shared/title/title.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ImagePipe,
    TitleCasePipe,
    TitleComponent,
    DialogModule,
    SkeletonCardImageComponent,
    TranslocoPipe,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  public projects = signal<ProjectsDatum[]>([]);

  private readonly dialog = inject(Dialog);
  private readonly homeDataService = inject(HomeDataService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getProjects();

    document.documentElement.scrollTop = 0;
  }

  getProjects() {
    this.homeDataService.homeData$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((resp) => {
        this.projects.set(resp.projects.data);
      });
  }

  openDialog(project: TentacledAttributes) {
    this.dialog.open(DialogComponent, {
      minWidth: '300px',
      width: '95%',
      maxWidth: '1000px',
      data: {
        project,
      },
    });
  }
}
