import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-post-card',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './skeleton-post-card.component.html',
  styleUrls: ['./skeleton-post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonPostCardComponent {
  @Input() public items = [1, 2, 3, 4, 5, 6, 7, 8];
}
