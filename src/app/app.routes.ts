import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./portfolio/portfolio.routes').then((c) => c.portfolioRoutes),
  },

  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.routes').then((c) => c.blogRoutes),
  },

  {
    path: '**',
    redirectTo: '',
  },
];
