import { DatePipe, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Datum } from '@src/app/core/interfaces/course-data/course-data';
import { PostDatum } from '@src/app/core/interfaces/post-data/post-data';
import { BlogDataService } from '@src/app/core/services/blog-data/blog-data.service';
import { TransitionNameDirective } from '@src/app/shared/directives/view-transition/transition-name.directive';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-blog-searcher',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, RouterLink, TransitionNameDirective],
  templateUrl: './blog-searcher.component.html',
  styleUrl: './blog-searcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogSearcherComponent {
  public posts = signal<PostDatum[]>([]);
  public courses = signal<Datum[]>([]);
  public query = signal<string>('');
  public isEmpty = signal<boolean>(true);
  public showEmptyMessage = signal<boolean>(false);

  private readonly route = inject(ActivatedRoute);
  private readonly blogDataService = inject(BlogDataService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.getQueryParams();

    document.documentElement.scrollTop = 0;
  }

  private getQueryParams(): void {
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.searcher(params['query']);
      });
  }

  private searcher(query: string): void {
    // Creamos dos observables para las dos peticiones
    const searchPost$ = this.blogDataService.searchPost(query);
    const searchCourse$ = this.blogDataService.searchCourse(query);

    // Usamos forkJoin para combinar ambas observables
    forkJoin([searchPost$, searchCourse$])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ([postRes, courseRes]) => {
          // Manejar los resultados de ambas peticiones aquí
          this.posts.set(postRes.data);
          this.courses.set(courseRes.data);

          // Verificar existencia y configurar los signals según sea necesario
          if (this.posts().length > 0 || this.courses().length > 0) {
            this.isEmpty.set(false);
          } else {
            this.isEmpty.set(true);
            this.query.set(query);
          }
        },

        error: (error) => {
          // Manejar errores si es necesario
          console.error('Error en la búsqueda:', error);
        },

        complete: () => {
          // Manejar la conclusión de la función
          if (this.posts().length > 0 || this.courses().length > 0) {
            this.showEmptyMessage.set(false);
          } else {
            this.showEmptyMessage.set(true);
          }
        },
      });
  }

  goToPost(product: PostDatum) {
    this.router.navigate(['/blog/post', product.attributes.slug], {
      state: { data: product },
    });
  }
}
