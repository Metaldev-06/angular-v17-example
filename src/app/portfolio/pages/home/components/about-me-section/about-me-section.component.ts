import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DataAttributes } from '@src/app/core/interfaces/home-data/home-data';
import { MarkdownModule } from 'ngx-markdown';

import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-about-me-section',
  standalone: true,
  imports: [MarkdownModule, NgOptimizedImage, SkeletonModule],
  templateUrl: './about-me-section.component.html',
  styleUrl: './about-me-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeSectionComponent {
  @Input({ required: true }) public aboutMe: DataAttributes =
    {} as DataAttributes;

  openCV() {
    window.open(this.aboutMe.resume_cv.data.attributes.url);
  }
}
