import { Component, signal, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ToastService } from '../../services/toast.service';
import { SpotlightTiltDirective } from '../../directives/spotlight-tilt.directive';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SpotlightTiltDirective, ScrollRevealDirective],
  template: `
    <section id="hero" class="relative pt-24 pb-14 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 overflow-hidden bg-blueprint">
      <!-- Ambient Lighting Blobs -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[400px] bg-indigo-600/12 rounded-full blur-[120px] sm:blur-[140px] pointer-events-none -z-10"></div>
      <div class="absolute top-1/3 right-4 sm:right-10 w-[250px] sm:w-[400px] h-[250px] sm:h-[300px] bg-cyan-500/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none -z-10"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          <!-- Left Column: Software Engineer Positioning & Dispatcher (7 cols) -->
          <div class="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left" appScrollReveal [revealDelay]="50">

            <!-- Live Availability Chip -->
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wider mb-6 shadow-inner">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Full-Time Roles • Cairo / Remote</span>
            </div>

            <!-- Headline: Alber Ashraf — Software Engineer -->
            <div class="space-y-2 mb-6">
              <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                Alber Ashraf
              </h1>
              <div class="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                Software Engineer
              </div>
              <p class="text-slate-400 font-medium text-sm sm:text-base tracking-wide">
                Full-Stack Systems &amp; Enterprise Product Engineering
              </p>
            </div>

            <!-- Precision Professional Summary -->
            <p class="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
              Software Engineer specialized in designing, engineering, and shipping complete, scalable software products and enterprise platforms. Deep hands-on experience across <span class="text-white font-medium">.NET 8/9</span>, <span class="text-white font-medium">SQL Server</span>, and <span class="text-white font-medium">Angular</span> (<span class="text-amber-300 font-semibold">GPA: 3.79 Excellent</span>, <span class="text-rose-400 font-semibold">Graduation Project: A+</span>). Proven at <span class="text-white font-medium">Athhan Solutions</span> optimizing transactional ERP database performance, and builder of <span class="text-cyan-300 font-medium">9 production systems</span> spanning clean architectures, distributed caching, and cloud infrastructure.
            </p>

            <!-- Social Links & Direct Quick-Contact Row (GitHub, LinkedIn, WhatsApp, Copy Phone) -->
            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-8 w-full">
              <!-- Main GitHub Profile Link -->
              <a
                href="https://github.com/Alber-Ashraf"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-white/10 hover:border-cyan-400/50 text-slate-200 hover:text-white text-xs font-mono font-medium transition-all shadow-sm hover:scale-[1.02] group"
                title="View GitHub Profile: Alber-Ashraf"
              >
                <svg class="w-4 h-4 text-slate-300 group-hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>github.com/Alber-Ashraf</span>
              </a>

              <!-- LinkedIn Link -->
              <a
                href="https://www.linkedin.com/in/alber-ashraf-042531216/"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-white/10 hover:border-indigo-400/50 text-slate-200 hover:text-white text-xs font-mono font-medium transition-all shadow-sm hover:scale-[1.02] group"
              >
                <svg class="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>

              <!-- Direct WhatsApp Chat Action -->
              <a
                href="https://wa.me/201228342430"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/15 border border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-emerald-600/30 text-xs font-mono font-medium transition-all shadow-sm hover:scale-[1.02]"
                title="Direct WhatsApp Chat: +20 122 834 2430"
              >
                <svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>WhatsApp ↗</span>
              </a>

              <!-- 1-Click Copy Phone Action -->
              <button
                type="button"
                (click)="copyPhone()"
                class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-white/10 hover:border-slate-400 text-slate-300 hover:text-white text-xs font-mono transition-all shadow-sm cursor-pointer"
                title="Click to copy +20 122 834 2430"
              >
                <svg class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>+20 122 834 2430</span>
              </button>
            </div>

            <!-- Unified Dual-CV Buttons + View Projects Anchor -->
            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-10 w-full sm:w-auto">

              <!-- 1-Page CV Button -->
              <div class="flex items-center rounded-xl bg-slate-900/90 border border-white/10 hover:border-indigo-500/50 transition-all shadow-md group">
                <button
                  (click)="profileService.openCvModal('one-page')"
                  class="flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-white hover:text-indigo-300 border-r border-white/10 rounded-l-xl transition-colors cursor-pointer"
                >
                  <svg class="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>1-Page CV</span>
                </button>
                <a
                  href="assets/cv/Alber_Ashraf_CV_OnePage.pdf"
                  download="Alber_Ashraf_CV_OnePage.pdf"
                  (click)="toastService.show('Downloading 1-Page Executive CV...', 'info')"
                  class="px-2.5 py-2.5 hover:bg-white/5 rounded-r-xl transition-colors text-slate-400 hover:text-white"
                  title="Download 1-Page PDF"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>

              <!-- Detailed CV Button -->
              <div class="flex items-center rounded-xl bg-slate-900/90 border border-white/10 hover:border-indigo-500/50 transition-all shadow-md group">
                <button
                  (click)="profileService.openCvModal('detailed')"
                  class="flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-white hover:text-indigo-300 border-r border-white/10 rounded-l-xl transition-colors cursor-pointer"
                >
                  <svg class="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Detailed CV</span>
                </button>
                <a
                  href="assets/cv/Alber_Ashraf_CV_Detailed.pdf"
                  download="Alber_Ashraf_CV_Detailed.pdf"
                  (click)="toastService.show('Downloading 2-Page Detailed CV...', 'info')"
                  class="px-2.5 py-2.5 hover:bg-white/5 rounded-r-xl transition-colors text-slate-400 hover:text-white"
                  title="Download Detailed PDF"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>

              <!-- View Projects Link -->
              <a
                href="#projects"
                class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs sm:text-sm font-medium transition-colors"
              >
                <span>View Projects (9)</span>
                <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>

            </div>

            <!-- Authentic Engineering Metrics -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-6 border-t border-white/10">
              <div class="flex flex-col">
                <span class="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight flex items-center justify-center lg:justify-start">
                  9<span class="text-indigo-400 text-xl">+</span>
                </span>
                <span class="text-[11px] uppercase font-mono text-slate-400 tracking-wider mt-1">Systems Built</span>
              </div>
              <div class="flex flex-col">
                <span class="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tracking-tight flex items-center justify-center lg:justify-start">
                  3.79
                </span>
                <span class="text-[11px] uppercase font-mono text-slate-400 tracking-wider mt-1">CS GPA (Excellent)</span>
              </div>
              <div class="flex flex-col">
                <span class="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tracking-tight flex items-center justify-center lg:justify-start">
                  A<span class="text-emerald-300 text-xl">+</span>
                </span>
                <span class="text-[11px] uppercase font-mono text-slate-400 tracking-wider mt-1">Graduation Project</span>
              </div>
              <div class="flex flex-col">
                <span class="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tracking-tight flex items-center justify-center lg:justify-start">
                  100<span class="text-emerald-300 text-lg">%</span>
                </span>
                <span class="text-[11px] uppercase font-mono text-slate-400 tracking-wider mt-1">NetArchTest Pass</span>
              </div>
            </div>

          </div>

          <!-- Right Column: Refined Executive Portrait Frame (5 cols) -->
          <div class="lg:col-span-5 flex justify-center items-center relative" appScrollReveal [revealDelay]="150">

            <!-- Subtle Soft Ambient Glow -->
            <div class="absolute w-64 sm:w-72 h-72 sm:h-80 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none -z-10"></div>

            <!-- Balanced Executive Portrait Container (max-width: 280px mobile, 340px desktop) -->
            <div
              class="relative w-full max-w-[280px] sm:max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden glass-card p-2 shadow-2xl border border-white/10 flex flex-col mx-auto"
              appSpotlightTilt
              [maxTilt]="4"
            >
              <!-- Image Area with Alber Ashraf Portrait -->
              <div
                class="relative w-full h-full rounded-xl overflow-hidden bg-slate-950 border border-white/10 flex items-center justify-center group"
              >
                <!-- Subtle background grid -->
                <div class="absolute inset-0 bg-dot-matrix opacity-30 pointer-events-none z-0"></div>

                <!-- Standard Photo with fallback -->
                <img
                  src="assets/alber-portrait.jpg"
                  (error)="onImageError()"
                  alt="Alber Ashraf - Software Engineer"
                  class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                  [class.hidden]="imageFailed()"
                />

                @if (imageFailed()) {
                  <!-- Clean Professional Avatar Schematic -->
                  <div class="w-full h-full flex flex-col items-center justify-center p-6 text-center z-10 bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/40">
                    <div class="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-rose-500 p-0.5 shadow-xl mb-4 group-hover:scale-105 transition-transform">
                      <div class="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                        <svg class="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <h3 class="text-white font-bold text-base tracking-tight">Alber Ashraf</h3>
                    <p class="text-indigo-300 font-mono text-xs mt-1">Software Engineer</p>
                  </div>
                }

                <!-- Clean Structured Caption Bar at Bottom Edge (Zero face clipping) -->
                <div class="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent z-10 flex items-center justify-between border-t border-white/5">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span class="text-xs font-semibold text-white">Alber Ashraf</span>
                  </div>
                  <span class="text-[10px] sm:text-[11px] font-mono text-slate-400">Software Engineer • Cairo</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  readonly profileService = inject(ProfileService);
  readonly toastService = inject(ToastService);

  readonly imageFailed = signal<boolean>(false);

  copyPhone(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('+20 122 834 2430').then(() => {
        this.toastService.show('Phone number copied (+20 122 834 2430)', 'success');
      });
    }
  }

  onImageError(): void {
    this.imageFailed.set(true);
  }
}
