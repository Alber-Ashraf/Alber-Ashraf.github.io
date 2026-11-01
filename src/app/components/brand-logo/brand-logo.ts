import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-brand-logo',
  standalone: true,
  imports: [],
  template: `
    <div
      class="relative flex items-center justify-center transition-all duration-300 group cursor-pointer"
      [style.width.px]="size"
      [style.height.px]="size"
    >
      <!-- Ambient Outer Pulse Glow -->
      <div
        class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-600 opacity-20 blur-sm group-hover:opacity-75 transition-opacity duration-500 animate-pulse"
      ></div>

      <!-- Bespoke Alber Ashraf Dual-A Architectural Monogram SVG -->
      <svg
        [attr.width]="size"
        [attr.height]="size"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="relative z-10 transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <!-- Background Gradient -->
          <linearGradient id="brandBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0B0F19" />
            <stop offset="100%" stop-color="#05070E" />
          </linearGradient>

          <!-- Hairline Border Gradient -->
          <linearGradient id="brandBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.6" />
            <stop offset="50%" stop-color="#6366F1" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0.6" />
          </linearGradient>

          <!-- Left 'A' (Alber) - Luminous Cyan to Electric Indigo -->
          <linearGradient id="brandLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#22D3EE" />
            <stop offset="50%" stop-color="#06B6D4" />
            <stop offset="100%" stop-color="#6366F1" />
          </linearGradient>

          <!-- Right 'A' (Ashraf) - Electric Indigo to Royal Violet -->
          <linearGradient id="brandRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6366F1" />
            <stop offset="50%" stop-color="#8B5CF6" />
            <stop offset="100%" stop-color="#A855F7" />
          </linearGradient>

          <!-- Core Radiant Glow -->
          <radialGradient id="brandCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#6366F1" stop-opacity="0" />
          </radialGradient>

          <!-- Soft Node Glow Filter -->
          <filter id="brandNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Ambient Outer Glow -->
        <rect width="64" height="64" rx="16" fill="url(#brandCoreGlow)" opacity="0.6" />

        <!-- Base Squircle Surface -->
        <rect width="62" height="62" x="1" y="1" rx="15" fill="url(#brandBgGrad)" stroke="url(#brandBorderGrad)" stroke-width="1.2" />

        <!-- Subtle Blueprint Tech Grid Lines -->
        <path d="M12 32 H52 M32 12 V52" stroke="rgba(255,255,255,0.04)" stroke-width="1" stroke-dasharray="2 2" />

        <!-- Left 'A' Wing & Stem (Cyan -> Indigo) -->
        <path
          d="M32 13 L15 48 L22 48 L26.5 38 L37.5 38"
          stroke="url(#brandLeftGrad)"
          stroke-width="4.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <!-- Right 'A' Wing & Stem (Indigo -> Violet) -->
        <path
          d="M32 13 L49 48 L42 48 L37.5 38 L26.5 38"
          stroke="url(#brandRightGrad)"
          stroke-width="4.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <!-- Nested Inner Architectural Delta 'A' -->
        <path
          d="M32 23 L23 42 H41 Z"
          stroke="url(#brandBorderGrad)"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="rgba(6, 182, 212, 0.06)"
        />

        <!-- Central Full-Stack Core Convergence Node -->
        <rect
          x="29.5"
          y="35.5"
          width="5"
          height="5"
          rx="1"
          transform="rotate(45 32 38)"
          fill="#FFFFFF"
          filter="url(#brandNodeGlow)"
        />
        <circle cx="32" cy="38" r="1.2" fill="#06B6D4" />

        <!-- Apex Radiant Crown Node -->
        <circle cx="32" cy="13" r="2.2" fill="#FFFFFF" filter="url(#brandNodeGlow)" />
        <circle cx="32" cy="13" r="1" fill="#6366F1" />
      </svg>
    </div>
  `
})
export class BrandLogoComponent {
  @Input() size = 38;
}
