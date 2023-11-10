import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SkillsDatum } from '@src/app/core/interfaces/home-data/home-data';
import { HomeDataService } from '@src/app/core/services/home-data/home-data.service';
import { AtroposComponent } from '@src/app/shared/atropos/atropos.component';
import { TitleComponent } from '@src/app/shared/title/title.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [AtroposComponent, TitleComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  public skills = signal<SkillsDatum[]>([]);
  public frontend = signal<SkillsDatum[]>([]);
  public backend = signal<SkillsDatum[]>([]);
  public database = signal<SkillsDatum[]>([]);
  public library = signal<SkillsDatum[]>([]);

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
        this.skills.set(resp.skills.data);
      });

    this.setData();
  }

  setData() {
    this.frontend.set(
      this.skills().filter((skill) => skill.attributes.stack === 'frontend')
    );
    this.backend.set(
      this.skills().filter((skill) => skill.attributes.stack === 'backend')
    );
    this.database.set(
      this.skills().filter((skill) => skill.attributes.stack === 'database')
    );
    this.library.set(
      this.skills().filter((skill) => skill.attributes.stack === 'library')
    );
  }
}
