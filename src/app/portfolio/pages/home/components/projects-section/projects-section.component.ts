import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  signal,
} from '@angular/core';
import {
  ProjectsDatum,
  TentacledAttributes,
} from '@src/app/core/interfaces/home-data/home-data';

import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { ImagePipe } from '@src/app/shared/pipes/image-pipe/image-pipe.pipe';
import { TitleComponent } from '@src/app/shared/title/title.component';
import { DialogComponent } from '@src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [
    DialogModule,
    RouterLink,
    NgOptimizedImage,
    ImagePipe,
    TitleComponent,
  ],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsSectionComponent {
  @Input({ required: true }) public projects: ProjectsDatum[] = [];

  public projectsFilter = signal<ProjectsDatum[]>([]);

  private readonly dialog = inject(Dialog);

  ngOnInit(): void {
    this.projectsFilter.update(() => {
      return this.projects.filter((project) => {
        return project.attributes.primary === true;
      });
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
