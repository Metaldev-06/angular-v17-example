import { NgClass, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-clipboard-button',
  standalone: true,
  imports: [NgClass, NgStyle, NgIf],
  templateUrl: './clipboard-button.component.html',
  styleUrls: ['./clipboard-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipboardButtonComponent {
  public copied = signal<boolean>(false);

  onClick() {
    this.copied.set(true);

    setTimeout(() => {
      this.copied.set(false);
    }, 2000);
  }
}
