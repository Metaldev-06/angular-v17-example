import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { NgClass, TitleCasePipe } from '@angular/common';
import { ImagePipe } from '../pipes/image-pipe/image-pipe.pipe';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [TitleCasePipe, ImagePipe, NgClass, TranslocoPipe],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  constructor(@Inject(DIALOG_DATA) public data: any) {}
}
