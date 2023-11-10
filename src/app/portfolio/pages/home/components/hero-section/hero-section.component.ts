import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

interface Image {
  name: string;
  path: string;
  url: string;
  width: string;
  height: string;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  public socials = signal<Image[]>([
    {
      name: 'twitter',
      path: '../../../../../../assets/twitter.svg',
      url: 'https://twitter.com/MetalDev_06',
      width: '30',
      height: '30',
    },
    {
      name: 'instagram',
      path: '../../../../../../assets/instagram.svg',
      url: 'https://www.instagram.com/fernydiaz62/',
      width: '30',
      height: '30',
    },
    {
      name: 'linkedin',
      path: '../../../../../../assets/linkedin.svg',
      url: 'https://www.linkedin.com/in/fernandodiaz62/',
      width: '30',
      height: '30',
    },
  ]);
}
