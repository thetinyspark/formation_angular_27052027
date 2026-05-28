import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appBgYellow]',
  standalone: true
})
export class BgYellowDirective {

  constructor() { 
    console.log('BgYellowDirective constructor');
    const el = inject(ElementRef);
    el.nativeElement.style.backgroundColor = 'yellow';
  }

}
