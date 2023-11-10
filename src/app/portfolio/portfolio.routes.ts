import { Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio.component';

export const portfolioRoutes: Routes = [
  {
    path: '',
    component: PortfolioComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.routes').then((c) => c.homeRoutes),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./pages/projects/projects.routes').then(
            (c) => c.projectRoutes
          ),
      },
      {
        path: 'skills',
        loadChildren: () =>
          import('./pages/skills/skills.routes').then((c) => c.skillsRoutes),
      },
      {
        path: 'education',
        loadChildren: () =>
          import('./pages/education/education.routes').then(
            (c) => c.educationRoutes
          ),
      },

      {
        path: 'contact',
        loadChildren: () =>
          import('./pages/contact/contact.routes').then((c) => c.contactRoutes),
      },
    ],
  },
];
