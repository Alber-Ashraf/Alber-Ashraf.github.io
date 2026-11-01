import { Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
}

@Component({
  selector: 'app-animated-background',
  standalone: true,
  imports: [],
  template: `
    <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <!-- Ambient Aurora Glow Meshes -->
      <div
        class="absolute -top-[25%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-indigo-600/15 via-violet-600/10 to-transparent blur-[120px] transition-transform duration-1000 ease-out will-change-transform"
        [style.transform]="'translate3d(' + mouseX * 0.03 + 'px, ' + (mouseY * 0.03 + scrollOffset * 0.05) + 'px, 0)'"
      ></div>

      <div
        class="absolute top-[40%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-cyan-500/12 via-indigo-500/08 to-transparent blur-[130px] transition-transform duration-1000 ease-out will-change-transform"
        [style.transform]="'translate3d(' + mouseX * -0.02 + 'px, ' + (mouseY * -0.02 - scrollOffset * 0.04) + 'px, 0)'"
      ></div>

      <div
        class="absolute bottom-[5%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-violet-600/10 via-emerald-500/05 to-transparent blur-[110px] transition-transform duration-1000 ease-out will-change-transform"
        [style.transform]="'translate3d(' + mouseX * 0.015 + 'px, ' + (mouseY * 0.015 + scrollOffset * 0.03) + 'px, 0)'"
      ></div>

      <!-- Perspective Architectural Blueprint Grid -->
      <div
        class="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:48px_48px] will-change-transform"
        [style.transform]="'translate3d(' + mouseX * 0.01 + 'px, ' + (mouseY * 0.01 + (scrollOffset % 48)) + 'px, 0)'"
      ></div>

      <!-- Interactive Particle Constellation Canvas -->
      <canvas #bgCanvas class="absolute inset-0 w-full h-full"></canvas>
    </div>
  `
})
export class AnimatedBackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('bgCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  mouseX = 0;
  mouseY = 0;
  scrollOffset = 0;

  private ctx: CanvasRenderingContext2D | null = null;
  private animationFrameId: number | null = null;
  private particles: Particle[] = [];
  private numParticles = 48;
  private maxConnectionDist = 110;
  private width = 0;
  private height = 0;
  private isDestroyed = false;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    if (typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.numParticles = 20;
    }

    this.initCanvas();
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    if (this.animationFrameId !== null && typeof window !== 'undefined') {
      window.cancelAnimationFrame(this.animationFrameId);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.mouseX = e.clientX - this.width / 2;
    this.mouseY = e.clientY - this.height / 2;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (typeof window !== 'undefined') {
      this.scrollOffset = window.scrollY;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resizeCanvas();
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.resizeCanvas();
    this.initParticles();

    // Run animation outside Angular zone to prevent triggering change detection on every tick
    this.ngZone.runOutsideAngular(() => {
      this.render();
    });
  }

  private resizeCanvas(): void {
    if (!this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = this.width;
    canvas.height = this.height;
  }

  private initParticles(): void {
    this.particles = [];
    const count = Math.min(this.numParticles, Math.floor((this.width * this.height) / 25000));

    for (let i = 0; i < count; i++) {
      const alpha = Math.random() * 0.35 + 0.15;
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 0.8,
        alpha: alpha,
        baseAlpha: alpha
      });
    }
  }

  private render(): void {
    if (this.isDestroyed || !this.ctx) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    const mouseAbsX = this.mouseX + this.width / 2;
    const mouseAbsY = this.mouseY + this.height / 2;

    // Update and draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around bounds
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      // Mouse interactivity: gentle attraction/proximity brightening
      const dx = mouseAbsX - p.x;
      const dy = mouseAbsY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        const force = (130 - dist) / 130;
        p.alpha = Math.min(0.8, p.baseAlpha + force * 0.4);
      } else {
        p.alpha = p.baseAlpha;
      }

      // Draw particle dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
      this.ctx.fill();

      // Connect near neighbors
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);

        if (dist2 < this.maxConnectionDist) {
          const lineAlpha = (1 - dist2 / this.maxConnectionDist) * 0.14;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
          this.ctx.lineWidth = 0.75;
          this.ctx.stroke();
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.render());
  }
}
