import { DatePipe, NgFor, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostDatum } from '@src/app/core/interfaces/post-data/post-data';

@Component({
  selector: 'app-card-post',
  standalone: true,
  imports: [RouterLink, TitleCasePipe, DatePipe],
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPostComponent {
  @Input() post: PostDatum = {} as PostDatum;
}
