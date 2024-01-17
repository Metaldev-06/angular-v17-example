import { NgClass, NgOptimizedImage, UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TransitionNameDirective } from '@src/app/shared/directives/view-transition/transition-name.directive';

import { SidebarModule } from 'primeng/sidebar';

interface NavItem {
  name: string;
  route: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    UpperCasePipe,
    RouterLinkActive,
    SidebarModule,
    TransitionNameDirective,
    NgOptimizedImage,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public headerFixed!: Boolean;

  public showSidebar: boolean = false;

  public navItems = signal<NavItem[]>([
    {
      name: 'Inicio',
      route: '',
    },
    {
      name: 'Proyectos',
      route: '/projects',
    },
    {
      name: 'Habilidades',
      route: '/skills',
    },
    {
      name: 'Educación',
      route: '/education',
    },
    {
      name: 'Blog',
      route: '/blog',
    },
  ]);

  @HostListener('window:scroll', ['$event'])
  activeHeader() {
    if (window.scrollY >= 300) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  }
}
