import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { NgClass, NgTemplateOutlet, TitleCasePipe } from '@angular/common';

import Atropos from 'atropos';
import { ImagePipe } from '../pipes/image-pipe/image-pipe.pipe';
import {
  CertificationsAttributes,
  IndigoAttributes,
} from '@src/app/core/interfaces/home-data/home-data';

@Component({
  selector: 'app-atropos',
  standalone: true,
  imports: [NgClass, ImagePipe, TitleCasePipe, NgTemplateOutlet],
  templateUrl: './atropos.component.html',
  styleUrls: ['./atropos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtroposComponent implements AfterViewInit {
  @Input() item!: IndigoAttributes;
  @Input({ required: true }) clase!: string;
  @Input() isPrimary = true;

  @Input() education!: CertificationsAttributes;

  ngAfterViewInit() {
    const myAtropos = Atropos({
      el: `.${this.clase}`,
      shadow: true,
      shadowOffset: 300,
    });
  }
}
