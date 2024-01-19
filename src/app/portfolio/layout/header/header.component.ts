import { NgClass, NgOptimizedImage, UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
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
    TranslocoPipe,
    FormsModule,
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
      name: 'layout-portfolio.home',
      route: '',
    },
    {
      name: 'layout-portfolio.projects',
      route: '/projects',
    },
    {
      name: 'layout-portfolio.skills',
      route: '/skills',
    },
    {
      name: 'layout-portfolio.educations',
      route: '/education',
    },
    {
      name: 'layout-portfolio.blog',
      route: '/blog',
    },
  ]);
  public selectedLanguage: string = 'es';

  private readonly translocoService = inject(TranslocoService);

  changeLanguage() {
    this.translocoService.setActiveLang(this.selectedLanguage);
  }

  @HostListener('window:scroll', ['$event'])
  activeHeader() {
    if (window.scrollY >= 300) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  }
}
