import { NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

interface Image {
  name: string;
  path: string;
  url: string;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  public socials = signal<Image[]>([
    {
      name: 'twitter',
      path: 'pi-twitter',
      url: 'https://twitter.com/MetalDev_06',
    },
    {
      name: 'instagram',
      path: 'pi-instagram',
      url: 'https://www.instagram.com/fernydiaz62/',
    },
    {
      name: 'linkedin',
      path: 'pi-linkedin',
      url: 'https://www.linkedin.com/in/fernandodiaz62/',
    },
  ]);

  public skills = signal<string[]>([
    '../../../../../../assets/skills/1.svg',
    '../../../../../../assets/skills/2.svg',
    '../../../../../../assets/skills/3.svg',
    '../../../../../../assets/skills/4.svg',
    '../../../../../../assets/skills/5.svg',
    '../../../../../../assets/skills/6.svg',
    '../../../../../../assets/skills/7.svg',
    '../../../../../../assets/skills/8.svg',
    '../../../../../../assets/skills/9.svg',
  ]);
}
