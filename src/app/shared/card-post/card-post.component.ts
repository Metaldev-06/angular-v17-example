import { DatePipe, NgFor, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PostDatum } from '@src/app/core/interfaces/post-data/post-data';
import { TransitionNameDirective } from '../directives/view-transition/transition-name.directive';

@Component({
  selector: 'app-card-post',
  standalone: true,
  imports: [RouterLink, TitleCasePipe, DatePipe, TransitionNameDirective],
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPostComponent {
  @Input() post: PostDatum = {} as PostDatum;

  private readonly router = inject(Router);

  goToPost(product: PostDatum) {
    this.router.navigate(['/blog/post', product.attributes.slug], {
      state: { data: product },
    });
  }
}
