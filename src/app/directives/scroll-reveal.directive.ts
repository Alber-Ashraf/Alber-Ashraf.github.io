import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0; // ms stagger
  @Input() staggerChildren = false;
  @Input() staggerStep = 70; // ms between children

  private observer?: IntersectionObserver;
  private timeoutId?: any;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'scroll-reveal');

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Math.max(0, this.revealDelay);
            this.timeoutId = setTimeout(() => {
              this.renderer.addClass(this.el.nativeElement, 'is-visible');

              if (this.staggerChildren) {
                const children = this.el.nativeElement.querySelectorAll('.stagger-item, [data-stagger-item]');
                children.forEach((child, idx) => {
                  const htmlChild = child as HTMLElement;
                  htmlChild.style.setProperty('--stagger-index', `${idx}`);
                  htmlChild.style.animationDelay = `${idx * this.staggerStep}ms`;
                  htmlChild.classList.add('stagger-visible');
                });
              }
            }, delay);

            this.observer?.unobserve(this.el.nativeElement);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      this.observer.observe(this.el.nativeElement);
    } else {
      // Fallback if observer not supported
      this.renderer.addClass(this.el.nativeElement, 'is-visible');
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.observer?.disconnect();
  }
}
