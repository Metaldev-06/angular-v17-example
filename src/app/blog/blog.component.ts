import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlogHeaderComponent } from './layout/blog-header/blog-header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../portfolio/layout/footer/footer.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [BlogHeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  ngOnInit(): void {
    document.documentElement.scrollTop = 0;
  }
}
