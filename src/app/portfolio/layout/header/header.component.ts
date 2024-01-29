import { i18nService } from './../../../core/services/transloco/i18n.service';
import { NgClass, NgOptimizedImage, UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { BlogDataService } from '@src/app/core/services/blog-data/blog-data.service';
import { HomeDataService } from '@src/app/core/services/home-data/home-data.service';
import { TransitionNameDirective } from '@src/app/shared/directives/view-transition/transition-name.directive';

import { SidebarModule } from 'primeng/sidebar';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

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
    MatMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HeaderComponent implements OnInit {
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
  public selectedLanguage: string = '';
  public selectedLanguageBlog: string = '';

  private readonly translocoService = inject(TranslocoService);
  private readonly i18nService = inject(i18nService);
  private readonly homeDataService = inject(HomeDataService);
  private readonly blogDataService = inject(BlogDataService);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }

  ngOnInit(): void {
    this.selectedLanguage = this.i18nService.getCurrentLanguage();
    this.selectedLanguageBlog = this.i18nService.getCurrentLanguage();
  }

  changeLanguage() {
    this.translocoService.setActiveLang(this.selectedLanguage);
    this.i18nService.setCurrentLanguage(this.selectedLanguage);
    this.changeLanguageData();
  }

  changeLanguageData() {
    if (this.selectedLanguageBlog === 'es') {
      this.selectedLanguageBlog = 'es-AR';
    } else {
      this.selectedLanguageBlog = this.selectedLanguageBlog;
    }

    this.homeDataService
      .getData(this.selectedLanguage)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => {
          this.homeDataService.setHomeData(resp.data.attributes);
          console.log(resp.data.attributes);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          // console.log('complete');
        },
      });

    this.blogDataService
      .getLatestPosts(this.selectedLanguage)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.blogDataService.setLatestPostData(res);
        // console.log(res);
      });
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
