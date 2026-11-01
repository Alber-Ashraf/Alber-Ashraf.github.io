import { Component, computed, inject } from '@angular/core';
import { ProfileService, FilterMode } from '../../services/profile.service';
import { SpotlightTiltDirective } from '../../directives/spotlight-tilt.directive';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { ProjectItem } from '../../models/profile.model';

@Component({
  selector: 'app-project-matrix',
  standalone: true,
  imports: [SpotlightTiltDirective, ScrollRevealDirective],
  template: `
    <section id="projects" class="py-20 relative overflow-hidden bg-blueprint">
      <!-- Ambient Lighting -->
      <div class="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div class="absolute bottom-1/4 right-10 w-[500px] h-[350px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <!-- Header & Filter Bar -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-8" appScrollReveal>
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-3">
              Production Software
            </div>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
            <p class="text-slate-400 text-sm sm:text-base max-w-2xl mt-3">
              Nine verified software systems engineered with .NET 9, SQL Server, and Angular—delivering end-to-end business value, architectural discipline, and high-performance persistence.
            </p>
          </div>

          <!-- Strictly 3 Filter Tabs: All (9), Full-Stack (5), Backend (4) -->
          <div class="grid grid-cols-3 sm:flex sm:flex-wrap gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 shadow-xl font-mono text-xs w-full sm:w-auto">

            <!-- All Projects (9) -->
            <button
              type="button"
              (click)="profileService.setFilter('all')"
              class="flex-1 sm:flex-initial px-4 py-2 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              [class]="activeFilter() === 'all' ?
                'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30' :
                'text-slate-400 hover:text-white hover:bg-white/5'"
            >
              <span>All Projects</span>
              <span class="px-1.5 py-0.5 rounded-md text-[10px]" [class]="activeFilter() === 'all' ? 'bg-indigo-700 text-white' : 'bg-white/5 text-slate-400'">
                {{ counts().all }}
              </span>
            </button>

            <!-- Full-Stack Projects (5) -->
            <button
              type="button"
              (click)="profileService.setFilter('fullstack')"
              class="flex-1 sm:flex-initial px-4 py-2 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              [class]="activeFilter() === 'fullstack' ?
                'bg-rose-600 text-white font-bold shadow-md shadow-rose-600/30' :
                'text-slate-400 hover:text-white hover:bg-white/5'"
            >
              <span>Full-Stack</span>
              <span class="px-1.5 py-0.5 rounded-md text-[10px]" [class]="activeFilter() === 'fullstack' ? 'bg-rose-700 text-white' : 'bg-white/5 text-slate-400'">
                {{ counts().fullstack }}
              </span>
            </button>

            <!-- Backend Projects (4) -->
            <button
              type="button"
              (click)="profileService.setFilter('backend')"
              class="flex-1 sm:flex-initial px-4 py-2 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              [class]="activeFilter() === 'backend' ?
                'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/30' :
                'text-slate-400 hover:text-white hover:bg-white/5'"
            >
              <span>Backend</span>
              <span class="px-1.5 py-0.5 rounded-md text-[10px]" [class]="activeFilter() === 'backend' ? 'bg-cyan-700 text-white' : 'bg-white/5 text-slate-400'">
                {{ counts().backend }}
              </span>
            </button>

          </div>

        </div>

        <!-- Prominent Active Skill Filter Banner -->
        @if (activeSkillFilter(); as skill) {
          <div
            class="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-950/90 via-slate-900/90 to-cyan-950/90 border border-cyan-500/40 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <div class="flex items-center gap-3">
              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-xs uppercase font-mono text-slate-400 tracking-wider">Filtered by Technology:</span>
                <span class="px-3 py-1 rounded-lg bg-cyan-500/25 border border-cyan-400/40 text-cyan-200 font-bold font-mono text-xs sm:text-sm shadow-sm">
                  {{ skill }}
                </span>
                <span class="text-xs text-slate-300 font-mono">
                  — Showing {{ filteredProjects().length }} of {{ counts().all }} systems
                </span>
              </div>
            </div>

            <button
              type="button"
              (click)="profileService.clearSkillFilter()"
              class="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-rose-500/20 hover:text-rose-300 border border-white/10 hover:border-rose-500/40 text-slate-200 text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Clear Filter</span>
              <span class="font-bold">✕</span>
            </button>
          </div>
        }

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" appScrollReveal [revealDelay]="100">

          @for (p of filteredProjects(); track p.id; let idx = $index) {
            <div
              class="glass-card p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-white/20 flex flex-col justify-between group transition-all duration-300 shadow-xl"
              appSpotlightTilt
              [maxTilt]="4"
            >
              <div>
                <!-- Top Card Meta Header: System # & Scope Badge -->
                <div class="flex items-center justify-between gap-2 mb-4 font-mono text-xs">
                  <span class="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400">
                    SYSTEM // 0{{ idx + 1 }}
                  </span>

                  <!-- Scope Badge -->
                  <span
                    class="px-2.5 py-1 rounded-md border font-semibold"
                    [class]="p.scope === 'Full-Stack Solution' ?
                      'bg-rose-500/15 text-rose-300 border-rose-500/30' :
                      'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'"
                  >
                    {{ p.scope }}
                  </span>
                </div>

                <!-- Live Animated Architecture Flow Vector Diagram -->
                <div class="w-full h-16 rounded-xl bg-slate-950/80 border border-white/5 mb-4 px-3 py-2 flex items-center justify-between overflow-hidden relative group-hover:border-indigo-500/30 transition-colors">
                  @if (p.scope === 'Full-Stack Solution') {
                    <!-- Full-Stack 3-Stage Vector: Client UI -> API Core -> Cloud DB -->
                    <div class="flex items-center justify-between w-full font-mono text-[9px] text-slate-400">
                      <!-- Stage 1: Client UI -->
                      <div class="flex flex-col items-center">
                        <div class="w-7 h-7 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-300">
                          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span class="text-[8.5px] text-rose-300 mt-1">Client UI</span>
                      </div>

                      <!-- Flow Stream 1 -->
                      <div class="flex-1 mx-2 relative flex items-center">
                        <div class="w-full h-[1.5px] bg-gradient-to-r from-rose-500 to-indigo-500 opacity-60"></div>
                        <div class="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping left-1/2 -translate-x-1/2"></div>
                      </div>

                      <!-- Stage 2: Web API -->
                      <div class="flex flex-col items-center">
                        <div class="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                          </svg>
                        </div>
                        <span class="text-[8.5px] text-indigo-300 mt-1">.NET Core</span>
                      </div>

                      <!-- Flow Stream 2 -->
                      <div class="flex-1 mx-2 relative flex items-center">
                        <div class="w-full h-[1.5px] bg-gradient-to-r from-indigo-500 to-emerald-500 opacity-60"></div>
                        <div class="absolute w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping left-1/2 -translate-x-1/2" style="animation-delay: 0.5s;"></div>
                      </div>

                      <!-- Stage 3: Persistence -->
                      <div class="flex flex-col items-center">
                        <div class="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zm0 5c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3" />
                          </svg>
                        </div>
                        <span class="text-[8.5px] text-emerald-300 mt-1">SQL / S3</span>
                      </div>
                    </div>
                  } @else {
                    <!-- Backend Architecture 3-Stage Vector: API Gateway -> CQRS Engine -> Storage Cluster -->
                    <div class="flex items-center justify-between w-full font-mono text-[9px] text-slate-400">
                      <!-- Stage 1: API Gateway -->
                      <div class="flex flex-col items-center">
                        <div class="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <span class="text-[8.5px] text-cyan-300 mt-1">API Gate</span>
                      </div>

                      <!-- Flow Stream 1 -->
                      <div class="flex-1 mx-2 relative flex items-center">
                        <div class="w-full h-[1.5px] bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-60"></div>
                        <div class="absolute w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping left-1/2 -translate-x-1/2"></div>
                      </div>

                      <!-- Stage 2: CQRS Handlers -->
                      <div class="flex flex-col items-center">
                        <div class="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <span class="text-[8.5px] text-indigo-300 mt-1">CQRS Core</span>
                      </div>

                      <!-- Flow Stream 2 -->
                      <div class="flex-1 mx-2 relative flex items-center">
                        <div class="w-full h-[1.5px] bg-gradient-to-r from-indigo-500 to-emerald-500 opacity-60"></div>
                        <div class="absolute w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping left-1/2 -translate-x-1/2" style="animation-delay: 0.5s;"></div>
                      </div>

                      <!-- Stage 3: Data Tier -->
                      <div class="flex flex-col items-center">
                        <div class="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zm0 5c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3" />
                          </svg>
                        </div>
                        <span class="text-[8.5px] text-emerald-300 mt-1">SQL/Redis</span>
                      </div>
                    </div>
                  }
                </div>

                <!-- Project Title & Subtitle -->
                <h3 class="text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  {{ p.name }}
                </h3>
                <p class="text-xs font-mono text-cyan-400/90 mt-1 mb-4">
                  {{ p.subtitle }}
                </p>

                <!-- Architectural Badge / Tagline -->
                <div class="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 font-mono text-xs text-slate-300 mb-5 flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full" [class]="p.hasFrontend ? 'bg-rose-400' : 'bg-cyan-400'"></span>
                  <span class="line-clamp-1">{{ p.badge }}</span>
                </div>

                <!-- Live Deployment Action or Private API Badge (Zero GitHub Links!) -->
                <div class="mb-5">
                  @if (p.scope === 'Full-Stack Solution' && p.liveUrl) {
                    <a
                      [href]="p.liveUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 text-xs font-mono font-medium transition-all group/link"
                      title="Launch Live Production System"
                    >
                      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Live System ↗</span>
                    </a>
                  } @else {
                    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10 text-slate-400 text-xs font-mono">
                      <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Enterprise Backend / Private API</span>
                    </div>
                  }
                </div>

                <!-- Core Architectural Impact Bullets -->
                <div class="space-y-2.5 mb-6">
                  @for (bullet of p.highlights.slice(0, 2); track bullet) {
                    <div class="flex items-start gap-2.5 text-xs text-slate-300">
                      <span class="text-cyan-400 text-sm leading-none mt-0.5">▹</span>
                      <span class="leading-relaxed line-clamp-3">{{ bullet }}</span>
                    </div>
                  }
                </div>

                <!-- Verified Metric Pill -->
                @if (p.metrics) {
                  <div class="mb-6 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span class="line-clamp-1">{{ p.metrics }}</span>
                  </div>
                }
              </div>

              <!-- Bottom Card Actions -->
              <div>
                <!-- Technologies Pills (Limit to 4 on preview) -->
                <div class="flex flex-wrap gap-1.5 mb-5 font-mono text-[10px]">
                  @for (t of p.technologies.slice(0, 4); track t) {
                    <span class="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-slate-300">
                      {{ t }}
                    </span>
                  }
                  @if (p.technologies.length > 4) {
                    <span class="px-1.5 py-0.5 rounded-md bg-white/5 text-slate-500">
                      +{{ p.technologies.length - 4 }}
                    </span>
                  }
                </div>

                <!-- Product & Architecture Dossier Deep-Dive Button -->
                <button
                  type="button"
                  (click)="profileService.openCockpit(p)"
                  class="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-cyan-600 text-slate-200 hover:text-white border border-white/10 hover:border-cyan-500/50 font-mono text-xs font-semibold transition-all flex items-center justify-center gap-2 group/btn shadow-sm cursor-pointer"
                >
                  <span>Product &amp; System Case Study</span>
                  <svg class="w-3.5 h-3.5 text-cyan-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

            </div>
          }

        </div>

      </div>
    </section>
  `
})
export class ProjectMatrixComponent {
  readonly profileService = inject(ProfileService);

  readonly filteredProjects = computed(() => this.profileService.filteredProjects());
  readonly activeFilter = computed(() => this.profileService.activeFilter());
  readonly activeSkillFilter = computed(() => this.profileService.activeSkillFilter());
  readonly counts = computed(() => this.profileService.projectCounts());
}
