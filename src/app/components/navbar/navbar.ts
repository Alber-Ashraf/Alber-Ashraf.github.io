import { Component, HostListener, signal, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { BrandLogoComponent } from '../brand-logo/brand-logo';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BrandLogoComponent],
  template: `
    <header class="fixed top-3 inset-x-0 z-40 px-3 sm:px-6 transition-all duration-300">
      <nav
        class="max-w-7xl mx-auto glass-panel rounded-2xl px-3.5 py-2 sm:px-5 sm:py-2.5 flex items-center justify-between shadow-2xl border border-white/10"
      >
        <!-- Custom Animated AA Brand Logo & Monogram -->
        <a
          href="#hero"
          (click)="scrollToSection('hero', $event)"
          class="flex items-center gap-3 group focus:outline-none"
        >
          <app-brand-logo [size]="36" />
          <div class="flex flex-col">
            <span class="text-sm font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors tracking-tight flex items-center gap-1.5">
              Alber Ashraf
              <span class="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            </span>
            <span class="text-[10.5px] uppercase font-mono text-slate-400 tracking-wider">
              Software Engineer
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Links (with deterministic scroll-spy & sliding pill) -->
        <div class="hidden lg:flex items-center gap-1 font-mono text-xs text-slate-300 bg-slate-900/40 p-1 rounded-xl border border-white/5">
          <button
            type="button"
            (click)="scrollToSection('hero')"
            class="px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
            [class]="activeSection() === 'hero' ? 'bg-gradient-to-r from-indigo-500/25 to-cyan-500/20 text-white border border-indigo-500/40 font-medium shadow-sm' : 'hover:text-white hover:bg-white/5 border border-transparent'"
          >
            Overview
          </button>
          <button
            type="button"
            (click)="scrollToSection('about')"
            class="px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
            [class]="activeSection() === 'about' ? 'bg-gradient-to-r from-indigo-500/25 to-cyan-500/20 text-white border border-indigo-500/40 font-medium shadow-sm' : 'hover:text-white hover:bg-white/5 border border-transparent'"
          >
            Capabilities
          </button>
          <button
            type="button"
            (click)="scrollToSection('skills')"
            class="px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
            [class]="activeSection() === 'skills' ? 'bg-gradient-to-r from-indigo-500/25 to-cyan-500/20 text-white border border-indigo-500/40 font-medium shadow-sm' : 'hover:text-white hover:bg-white/5 border border-transparent'"
          >
            Skills
          </button>
          <button
            type="button"
            (click)="scrollToSection('experience')"
            class="px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
            [class]="activeSection() === 'experience' ? 'bg-gradient-to-r from-indigo-500/25 to-cyan-500/20 text-white border border-indigo-500/40 font-medium shadow-sm' : 'hover:text-white hover:bg-white/5 border border-transparent'"
          >
            Experience
          </button>
          <button
            type="button"
            (click)="scrollToSection('projects')"
            class="px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1.5"
            [class]="activeSection() === 'projects' ? 'bg-gradient-to-r from-indigo-500/25 to-cyan-500/20 text-white border border-indigo-500/40 font-medium shadow-sm' : 'hover:text-white hover:bg-white/5 border border-transparent'"
          >
            <span>Projects</span>
            <span class="px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">9</span>
          </button>
          <button
            type="button"
            (click)="scrollToSection('education')"
            class="px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
            [class]="activeSection() === 'education' ? 'bg-gradient-to-r from-indigo-500/25 to-cyan-500/20 text-white border border-indigo-500/40 font-medium shadow-sm' : 'hover:text-white hover:bg-white/5 border border-transparent'"
          >
            Education
          </button>
          <button
            type="button"
            (click)="scrollToSection('contact')"
            class="px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
            [class]="activeSection() === 'contact' ? 'bg-gradient-to-r from-indigo-500/25 to-cyan-500/20 text-white border border-indigo-500/40 font-medium shadow-sm' : 'hover:text-white hover:bg-white/5 border border-transparent'"
          >
            Contact
          </button>
        </div>

        <!-- Right Quick Actions & Social Profile Links -->
        <div class="flex items-center gap-2">
          <!-- Main GitHub Profile Link (Navbar Prominent Icon Button) -->
          <a
            href="https://github.com/Alber-Ashraf"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-white transition-all shadow-sm hover:scale-105 group"
            title="Alber Ashraf on GitHub (Profile)"
            aria-label="GitHub Profile"
          >
            <svg class="w-4 h-4 transition-transform group-hover:rotate-6 text-slate-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          <!-- LinkedIn Profile Link -->
          <a
            href="https://linkedin.com/in/alber-ashraf"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden sm:flex p-2 rounded-xl bg-slate-900/80 border border-white/10 hover:border-indigo-400/50 text-slate-300 hover:text-white transition-all shadow-sm hover:scale-105 group"
            title="Alber Ashraf on LinkedIn"
            aria-label="LinkedIn Profile"
          >
            <svg class="w-4 h-4 transition-transform group-hover:scale-110 text-slate-300 group-hover:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>

          <!-- CV Modal Action -->
          <button
            (click)="profileService.openCvModal('one-page')"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-xs font-semibold text-white transition-all shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:scale-[1.02] cursor-pointer"
            title="Preview or Download CVs"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>CV</span>
          </button>

          <!-- Mobile Hamburger Toggle -->
          <button
            (click)="isMobileMenuOpen.set(!isMobileMenuOpen())"
            class="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              @if (!isMobileMenuOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              }
            </svg>
          </button>
        </div>
      </nav>

      <!-- Mobile Animated Glass Drawer -->
      @if (isMobileMenuOpen()) {
        <div class="lg:hidden mt-2 p-4 glass-panel rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-1.5 font-mono text-sm backdrop-blur-2xl animate-in fade-in slide-in-from-top-3 duration-200">
          <div class="flex items-center justify-between pb-3 mb-1 border-b border-white/10">
            <span class="text-xs uppercase text-slate-400 tracking-wider">Navigation Menu</span>
            <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Available for Hire</span>
            </div>
          </div>

          <button
            type="button"
            (click)="scrollToSection('hero', $event)"
            class="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
            [class]="activeSection() === 'hero' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : ''"
          >
            <span>01 // Overview</span>
            <span class="text-xs text-slate-500">Intro</span>
          </button>
          <button
            type="button"
            (click)="scrollToSection('about', $event)"
            class="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
            [class]="activeSection() === 'about' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : ''"
          >
            <span>02 // Capabilities</span>
            <span class="text-xs text-slate-500">Pillars</span>
          </button>
          <button
            type="button"
            (click)="scrollToSection('skills', $event)"
            class="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
            [class]="activeSection() === 'skills' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : ''"
          >
            <span>03 // Technical Skills</span>
            <span class="text-xs text-slate-500">Arsenal</span>
          </button>
          <button
            type="button"
            (click)="scrollToSection('experience', $event)"
            class="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
            [class]="activeSection() === 'experience' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : ''"
          >
            <span>04 // Work Experience</span>
            <span class="text-xs text-slate-500">Track Record</span>
          </button>
          <button
            type="button"
            (click)="scrollToSection('projects', $event)"
            class="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
            [class]="activeSection() === 'projects' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : ''"
          >
            <span>05 // Featured Projects</span>
            <span class="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold">9</span>
          </button>
          <button
            type="button"
            (click)="scrollToSection('education', $event)"
            class="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
            [class]="activeSection() === 'education' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : ''"
          >
            <span>06 // Education & Certs</span>
            <span class="text-xs text-slate-500">Degree & Honors</span>
          </button>
          <button
            type="button"
            (click)="scrollToSection('contact', $event)"
            class="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
            [class]="activeSection() === 'contact' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : ''"
          >
            <span>07 // Contact</span>
            <span class="text-xs text-slate-500">Direct Dispatch</span>
          </button>

          <!-- Mobile Direct Actions & Profiles -->
          <div class="pt-3 mt-1 border-t border-white/10 flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <a
                href="https://github.com/Alber-Ashraf"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 py-2 px-3 rounded-xl bg-slate-900 border border-white/10 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub Profile</span>
              </a>
              <a
                href="https://linkedin.com/in/alber-ashraf"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 py-2 px-3 rounded-xl bg-slate-900 border border-white/10 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>

            <!-- WhatsApp Direct Action Button in Mobile Menu -->
            <a
              href="https://wa.me/201228342430"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full py-2.5 px-3 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Chat on WhatsApp (+20 122 834 2430)</span>
            </a>

            <div class="flex gap-2">
              <button
                (click)="profileService.openCvModal('one-page'); isMobileMenuOpen.set(false)"
                class="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold text-center shadow-md cursor-pointer"
              >
                1-Page CV
              </button>
              <button
                (click)="profileService.openCvModal('detailed'); isMobileMenuOpen.set(false)"
                class="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-center border border-white/10 cursor-pointer"
              >
                Detailed CV
              </button>
            </div>
          </div>
        </div>
      }
    </header>
  `
})
export class NavbarComponent {
  readonly profileService = inject(ProfileService);
  readonly activeSection = signal<string>('hero');
  readonly isMobileMenuOpen = signal<boolean>(false);

  private isProgrammaticScrolling = false;
  private scrollTimeout: any = null;

  scrollToSection(sectionId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.activeSection.set(sectionId);
    this.isMobileMenuOpen.set(false);

    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;

    // Calculate exact target offset minus 88px fixed navbar clearance
    const navHeight = 88;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

    this.isProgrammaticScrolling = true;
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Re-enable scroll spy after smooth travel completes
    this.scrollTimeout = setTimeout(() => {
      this.isProgrammaticScrolling = false;
    }, 750);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.isProgrammaticScrolling || typeof window === 'undefined') return;

    const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
    const scrollPos = window.scrollY + 140;

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          this.activeSection.set(id);
          break;
        }
      }
    }
  }
}
