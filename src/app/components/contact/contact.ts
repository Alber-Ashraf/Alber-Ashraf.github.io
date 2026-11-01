import { Component, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ToastService } from '../../services/toast.service';
import { SpotlightTiltDirective } from '../../directives/spotlight-tilt.directive';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { BrandLogoComponent } from '../brand-logo/brand-logo';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SpotlightTiltDirective, ScrollRevealDirective, BrandLogoComponent],
  template: `
    <footer id="contact" class="pt-20 pb-12 relative overflow-hidden bg-slate-950/90 border-t border-white/5">
      <!-- Ambient Lighting Glows -->
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>
      <div class="absolute bottom-10 right-10 w-[400px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <!-- Top Area: Executive CTA -->
        <div class="flex flex-col items-center text-center mb-14" appScrollReveal>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-3">
            Contact &amp; Dispatch
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Let's Build Scalable Software Together
          </h2>
          <p class="text-slate-400 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed">
            Available for Software Engineer, Full-Stack .NET, and Systems Engineering roles. Ready to deliver immediate impact for engineering teams in Cairo, Egypt or remote engagements globally.
          </p>
        </div>

        <!-- Direct Contact & Credentials Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" appScrollReveal [revealDelay]="100">

          <!-- Card 1: Direct Email with 1-Click Copy -->
          <div
            class="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-indigo-500/40 transition-all shadow-xl"
            appSpotlightTilt
          >
            <div>
              <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-105 transition-transform">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span class="text-xs font-mono uppercase text-indigo-400 tracking-wider block mb-1">Direct Email</span>
              <h3 class="text-base font-bold text-white tracking-tight break-all">alber.ashraf.w&#64;gmail.com</h3>
            </div>

            <div class="mt-6 pt-4 border-t border-white/5 flex items-center gap-2">
              <button
                type="button"
                (click)="copyEmail()"
                class="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-indigo-600/20 text-slate-200 hover:text-white border border-white/10 hover:border-indigo-500/40 font-mono text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Copy Email</span>
                <span>⎘</span>
              </button>
              <a
                href="mailto:alber.ashraf.w@gmail.com"
                class="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 font-mono text-xs transition-colors"
                title="Open default email client"
              >
                Send ↗
              </a>
            </div>
          </div>

          <!-- Card 2: Phone & WhatsApp with DUAL Interactive Actions -->
          <div
            class="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-emerald-500/40 transition-all shadow-xl"
            appSpotlightTilt
          >
            <div>
              <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span class="text-xs font-mono uppercase text-emerald-400 tracking-wider block mb-1">Phone / WhatsApp</span>
              <h3 class="text-base font-bold text-white tracking-tight">+20 122 834 2430</h3>
            </div>

            <!-- DUAL Interactive Controls: Copy Number & Direct WhatsApp Chat -->
            <div class="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center gap-2">
              <button
                type="button"
                (click)="copyPhone()"
                class="w-full sm:flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 hover:border-white/20 font-mono text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                title="Copy phone number to clipboard"
              >
                <span>Copy Phone</span>
                <span>⎘</span>
              </button>

              <a
                href="https://wa.me/201228342430"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full sm:flex-1 py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/35 text-emerald-300 hover:text-emerald-200 border border-emerald-500/40 hover:border-emerald-400 font-mono text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                title="Start WhatsApp conversation"
              >
                <svg class="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>WhatsApp ↗</span>
              </a>
            </div>
          </div>

          <!-- Card 3: Status & Profiles -->
          <div
            class="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-cyan-500/40 transition-all shadow-xl"
            appSpotlightTilt
          >
            <div>
              <div class="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span class="text-xs font-mono uppercase text-cyan-400 tracking-wider block mb-1">Location &amp; Status</span>
              <h3 class="text-base font-bold text-white tracking-tight">Cairo, Egypt (UTC+2)</h3>
            </div>

            <div class="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-300">
              <span>Military: Completed</span>
              <span class="text-emerald-400 flex items-center gap-1.5 font-semibold">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Available Now
              </span>
            </div>
          </div>

        </div>

        <!-- Middle Action Bar: Unified CV Buttons -->
        <div class="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 shadow-xl">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white tracking-tight">Executive &amp; Technical Curriculum Vitae</h4>
              <p class="text-xs text-slate-400">Compiled from verified project source code and git repositories.</p>
            </div>
          </div>

          <!-- Unified Dual-CV Buttons (Matching Hero Styling) -->
          <div class="flex flex-wrap items-center gap-3">

            <!-- 1-Page CV Button -->
            <div class="flex items-center rounded-xl bg-slate-900 border border-white/10 hover:border-indigo-500/50 transition-all shadow-md group">
              <button
                (click)="profileService.openCvModal('one-page')"
                class="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white hover:text-indigo-300 border-r border-white/10 rounded-l-xl transition-colors cursor-pointer"
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
                class="px-2.5 py-2 hover:bg-white/5 rounded-r-xl transition-colors text-slate-400 hover:text-white"
                title="Download 1-Page PDF"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>

            <!-- Detailed CV Button -->
            <div class="flex items-center rounded-xl bg-slate-900 border border-white/10 hover:border-indigo-500/50 transition-all shadow-md group">
              <button
                (click)="profileService.openCvModal('detailed')"
                class="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white hover:text-indigo-300 border-r border-white/10 rounded-l-xl transition-colors cursor-pointer"
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
                class="px-2.5 py-2 hover:bg-white/5 rounded-r-xl transition-colors text-slate-400 hover:text-white"
                title="Download Detailed PDF"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>

          </div>
        </div>

        <!-- Clean Horizontal Bottom Bar: Brand Logo & Name (Left), Quick Links (Center), Socials (Right) -->
        <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-slate-400">

          <!-- Left: Brand Logo, Name & Role -->
          <div class="flex items-center gap-3">
            <app-brand-logo [size]="30" />
            <div>
              <span class="text-white font-semibold">Alber Ashraf</span>
              <span class="text-slate-500 mx-2">•</span>
              <span class="text-slate-400">Software Engineer</span>
            </div>
          </div>

          <!-- Center: Quick Section Links -->
          <div class="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <button type="button" (click)="scrollTo('hero')" class="hover:text-cyan-300 transition-colors cursor-pointer">Overview</button>
            <button type="button" (click)="scrollTo('about')" class="hover:text-cyan-300 transition-colors cursor-pointer">Capabilities</button>
            <button type="button" (click)="scrollTo('skills')" class="hover:text-cyan-300 transition-colors cursor-pointer">Skills</button>
            <button type="button" (click)="scrollTo('experience')" class="hover:text-cyan-300 transition-colors cursor-pointer">Experience</button>
            <button type="button" (click)="scrollTo('projects')" class="hover:text-cyan-300 transition-colors cursor-pointer">Projects</button>
            <button type="button" (click)="scrollTo('education')" class="hover:text-cyan-300 transition-colors cursor-pointer">Education</button>
            <button type="button" (click)="scrollTo('contact')" class="hover:text-cyan-300 transition-colors cursor-pointer">Contact</button>
          </div>

          <!-- Right: Social Links & GitHub Profile -->
          <div class="flex items-center gap-3">
            <!-- GitHub Profile Link -->
            <a
              href="https://github.com/Alber-Ashraf"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-lg bg-white/5 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
              title="GitHub Profile: Alber-Ashraf"
              aria-label="GitHub Profile"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            <!-- LinkedIn Profile Link -->
            <a
              href="https://www.linkedin.com/in/alber-ashraf-042531216/"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-lg bg-white/5 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-400 border border-white/10 flex items-center justify-center transition-colors"
              title="LinkedIn Profile: Alber Ashraf"
              aria-label="LinkedIn Profile"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            <!-- WhatsApp Direct Link -->
            <a
              href="https://wa.me/201228342430"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 rounded-lg bg-white/5 hover:bg-emerald-600/20 text-slate-300 hover:text-emerald-400 border border-white/10 flex items-center justify-center transition-colors"
              title="WhatsApp: +20 122 834 2430"
              aria-label="WhatsApp Chat"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>
          </div>

        </div>

        <!-- Colophon / Copyright -->
        <div class="mt-8 text-center text-[11px] font-mono text-slate-500">
          <p>© 2026 Alber Ashraf • Software Engineer</p>
        </div>

      </div>
    </footer>
  `
})
export class ContactComponent {
  readonly profileService = inject(ProfileService);
  readonly toastService = inject(ToastService);

  copyEmail(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('alber.ashraf.w@gmail.com').then(() => {
        this.toastService.show('Email copied to clipboard: alber.ashraf.w@gmail.com', 'success');
      });
    }
  }

  copyPhone(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('+20 122 834 2430').then(() => {
        this.toastService.show('Phone number copied to clipboard: +20 122 834 2430', 'success');
      });
    }
  }

  scrollTo(sectionId: string): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;

    const navHeight = 88;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}
