import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0; // ms stagger
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'scroll-reveal');

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (this.revealDelay > 0) {
              setTimeout(() => {
                this.renderer.addClass(this.el.nativeElement, 'is-visible');
              }, this.revealDelay);
            } else {
              this.renderer.addClass(this.el.nativeElement, 'is-visible');
            }
            this.observer?.unobserve(this.el.nativeElement);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
      });

      this.observer.observe(this.el.nativeElement);
    } else {
      // Fallback if observer not supported
      this.renderer.addClass(this.el.nativeElement, 'is-visible');
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
