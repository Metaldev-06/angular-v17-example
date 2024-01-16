import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EducationsDatum } from '@src/app/core/interfaces/home-data/home-data';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [TimelineModule, NgClass, CardModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent {
  @Input({ required: true }) public timelineData: EducationsDatum[] = [];
}
