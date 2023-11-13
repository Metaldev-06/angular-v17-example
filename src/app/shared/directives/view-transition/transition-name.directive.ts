import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[transition]',
  standalone: true,
})
export class TransitionNameDirective implements AfterViewInit {
  @Input({ required: true, alias: 'transition' }) name!: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'viewTransitionName',
      `transition${this.name}`
    );
  }
}
