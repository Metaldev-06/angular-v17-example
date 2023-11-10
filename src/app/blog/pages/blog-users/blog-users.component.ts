import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-blog-users',
  standalone: true,
  imports: [],
  templateUrl: './blog-users.component.html',
  styleUrl: './blog-users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogUsersComponent {}
