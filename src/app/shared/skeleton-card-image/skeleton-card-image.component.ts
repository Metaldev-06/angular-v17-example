import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-card-image',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './skeleton-card-image.component.html',
  styleUrl: './skeleton-card-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonCardImageComponent {
  @Input() public items = [1, 2, 3, 4, 5, 6, 7, 8];
}
