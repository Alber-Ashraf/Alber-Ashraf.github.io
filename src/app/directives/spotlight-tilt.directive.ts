import { Directive, ElementRef, HostListener, Input, Renderer2, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appSpotlightTilt]',
  standalone: true
})
export class SpotlightTiltDirective implements OnInit, OnDestroy {
  @Input() maxTilt = 4; // subtle high-craft 3D angle
  @Input() enableTilt = true;

  private isTouchDevice = false;
  private rafId: number | null = null;
  private targetX = 0;
  private targetY = 0;
  private rect: DOMRect | null = null;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    }

    if (!this.isTouchDevice) {
      this.renderer.addClass(this.el.nativeElement, 'spotlight-card');
    }
  }

  ngOnDestroy(): void {
    if (this.rafId !== null && typeof window !== 'undefined') {
      cancelAnimationFrame(this.rafId);
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (this.isTouchDevice) return;

    this.rect = this.el.nativeElement.getBoundingClientRect();
    this.targetX = e.clientX - this.rect.left;
    this.targetY = e.clientY - this.rect.top;

    if (this.rafId === null) {
      this.rafId = requestAnimationFrame(() => this.updateTilt());
    }
  }

  private updateTilt(): void {
    this.rafId = null;
    if (!this.rect || this.isTouchDevice) return;

    const el = this.el.nativeElement;
    el.style.setProperty('--mouse-x', `${this.targetX}px`);
    el.style.setProperty('--mouse-y', `${this.targetY}px`);

    if (this.enableTilt) {
      const centerX = this.rect.width / 2;
      const centerY = this.rect.height / 2;
      const rotateX = -((this.targetY - centerY) / centerY) * this.maxTilt;
      const rotateY = ((this.targetX - centerX) / centerX) * this.maxTilt;

      el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.008, 1.008, 1.008)`;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.isTouchDevice) return;

    if (this.rafId !== null && typeof window !== 'undefined') {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.el.nativeElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }
}
