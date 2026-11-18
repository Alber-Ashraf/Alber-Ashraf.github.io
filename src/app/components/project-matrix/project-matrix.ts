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
            <h2 class="section-fluid-title font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
            <p class="text-slate-400 text-sm sm:text-base max-w-2xl mt-3">
              Nine verified software systems engineered with .NET 9, SQL Server, and Angular—delivering end-to-end business value, architectural discipline, and high-performance persistence.
            </p>
          </div>

          <!-- Strictly 3 Filter Tabs: All (9), Full-Stack (5), Backend (4) -->
          <div class="flex overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 shadow-xl font-mono text-xs w-full sm:w-auto">

            <!-- All Projects (9) -->
            <button
              type="button"
              (click)="profileService.setFilter('all')"
              class="flex-shrink-0 min-h-[44px] px-4 py-2 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              [class]="activeFilter() === 'all' ?
                'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30' :
                'text-slate-400 hover:text-white hover:bg-white/5'"
              [attr.aria-label]="'Filter by All Projects (' + counts().all + ' systems)'"
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
              class="flex-shrink-0 min-h-[44px] px-4 py-2 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              [class]="activeFilter() === 'fullstack' ?
                'bg-rose-600 text-white font-bold shadow-md shadow-rose-600/30' :
                'text-slate-400 hover:text-white hover:bg-white/5'"
              [attr.aria-label]="'Filter by Full-Stack Projects (' + counts().fullstack + ' systems)'"
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
              class="flex-shrink-0 min-h-[44px] px-4 py-2 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              [class]="activeFilter() === 'backend' ?
                'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/30' :
                'text-slate-400 hover:text-white hover:bg-white/5'"
              [attr.aria-label]="'Filter by Backend Projects (' + counts().backend + ' systems)'"
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
              class="w-full sm:w-auto min-h-[44px] px-4 py-2 rounded-xl bg-white/10 hover:bg-rose-500/20 hover:text-rose-300 border border-white/10 hover:border-rose-500/40 text-slate-200 text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              aria-label="Clear active technology filter"
            >
              <span>Clear Filter</span>
              <span class="font-bold">✕</span>
            </button>
          </div>
        }

        <!-- Projects Grid with Cascading Staggered Reveals -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" appScrollReveal [revealDelay]="60" [staggerChildren]="true">

          @for (p of filteredProjects(); track p.id; let idx = $index) {
            <div
              class="glass-card p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-white/20 flex flex-col justify-between group transition-all duration-300 shadow-xl stagger-item"
              [style.--stagger-index]="idx"
              appSpotlightTilt
              [maxTilt]="3"
            >
              <div>
                <!-- Top Card Meta Header: Scope Badge -->
                <div class="flex items-center justify-between gap-2 mb-4 font-mono text-xs">
                  <!-- Scope Badge -->
                  <span
                    class="px-2.5 py-1 rounded-md border font-semibold inline-flex items-center gap-1.5"
                    [class]="p.scope === 'Full-Stack Solution' ?
                      'bg-rose-500/15 text-rose-300 border-rose-500/30' :
                      'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'"
                  >
                    <span class="w-1.5 h-1.5 rounded-full" [class]="p.scope === 'Full-Stack Solution' ? 'bg-rose-400' : 'bg-indigo-400'"></span>
                    <span>{{ p.scope }}</span>
                  </span>

                  @if (p.scope === 'Full-Stack Solution' && p.liveUrl) {
                    <span class="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Live</span>
                    </span>
                  } @else {
                    <span class="text-[11px] text-slate-400 font-mono">Enterprise API</span>
                  }
                </div>

                <!-- Interactive Quick-Toggle on Card Face: System Overview vs Architecture Flow -->
                <div class="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-white/10 mb-4 font-mono text-xs">
                  <button
                    type="button"
                    (click)="setCardView(p.id, 'overview')"
                    class="flex-1 min-h-[44px] py-2 px-3 rounded-lg transition-all text-center cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    [class]="getCardView(p.id) === 'overview' ?
                      'bg-indigo-600/30 text-white font-bold border border-indigo-500/40 shadow-sm' :
                      'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'"
                    [attr.aria-label]="'Switch to System Overview for ' + p.name"
                  >
                    <span>Overview</span>
                  </button>
                  <button
                    type="button"
                    (click)="setCardView(p.id, 'flow')"
                    class="flex-1 min-h-[44px] py-2 px-3 rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    [class]="getCardView(p.id) === 'flow' ?
                      'bg-cyan-600/30 text-cyan-200 font-bold border border-cyan-500/40 shadow-sm' :
                      'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'"
                    [attr.aria-label]="'Switch to Architecture Flow for ' + p.name"
                  >
                    <span>Architecture Flow</span>
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  </button>
                </div>

                <!-- Project Title & Subtitle -->
                <h3 class="text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  {{ p.name }}
                </h3>
                <p class="text-xs font-mono text-cyan-400/90 mt-1 mb-3">
                  {{ p.subtitle }}
                </p>

                <!-- Architectural Badge / Tagline -->
                <div class="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 font-mono text-xs text-slate-300 mb-4 flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full" [class]="p.hasFrontend ? 'bg-rose-400' : 'bg-cyan-400'"></span>
                  <span class="line-clamp-1">{{ p.badge }}</span>
                </div>

                <!-- Live Deployment Action or Private API Badge -->
                <div class="mb-4">
                  @if (p.scope === 'Full-Stack Solution' && p.liveUrl) {
                    <a
                      [href]="p.liveUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="min-h-[44px] min-w-[44px] inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 text-xs font-mono font-medium transition-all group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                      title="Launch Live Production System"
                      [attr.aria-label]="'Launch Live Production System for ' + p.name"
                    >
                      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Live System ↗</span>
                    </a>
                  } @else {
                    <div class="min-h-[44px] inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-slate-400 text-xs font-mono">
                      <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>{{ p.scope === 'Full-Stack Solution' ? 'Full-Stack System (Source Verified)' : 'Enterprise Backend / Private API' }}</span>
                    </div>
                  }
                </div>

                <!-- VIEW MODE 1: System Overview (Default) -->
                @if (getCardView(p.id) === 'overview') {
                  <!-- Core Architectural Impact Bullets -->
                  <div class="space-y-2.5 mb-5 animate-in fade-in duration-200">
                    @for (bullet of p.highlights.slice(0, 2); track bullet) {
                      <div class="flex items-start gap-2.5 text-xs text-slate-300">
                        <span class="text-cyan-400 text-sm leading-none mt-0.5">▹</span>
                        <span class="leading-relaxed line-clamp-3">{{ bullet }}</span>
                      </div>
                    }
                  </div>

                  <!-- Verified Metric Pill -->
                  @if (p.metrics) {
                    <div class="mb-5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono flex items-center gap-2">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span class="line-clamp-1">{{ p.metrics }}</span>
                    </div>
                  }
                } @else {
                  <!-- VIEW MODE 2: Interactive Architecture Stack Flow -->
                  @let layers = p.architectureLayers || defaultLayers;
                  @let activeLayerIndex = getCardLayer(p.id);
                  @let activeLayer = layers[activeLayerIndex] || layers[0];

                  <div class="mb-5 animate-in fade-in duration-200">
                    <!-- Clickable Layer Nodes Pipeline -->
                    <div class="grid grid-cols-4 gap-1 p-1 bg-slate-950/90 rounded-xl border border-white/10 mb-3 font-mono text-[10px]">
                      @for (layer of layers; track layer.name; let lIdx = $index) {
                        <button
                          type="button"
                          (click)="setCardLayer(p.id, lIdx)"
                          class="min-h-[44px] py-2 px-1 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                          [class]="activeLayerIndex === lIdx ?
                            'bg-cyan-500/25 border border-cyan-400 text-cyan-200 font-bold shadow-sm' :
                            'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'"
                          [title]="'Inspect ' + layer.name"
                          [attr.aria-label]="'Inspect ' + layer.name + ' layer for ' + p.name"
                        >
                          <span class="truncate w-full text-center">{{ layer.name.split(' ')[0] }}</span>
                        </button>
                      }
                    </div>

                    <!-- Dynamic Layer Inspection Panel -->
                    <div class="p-3 rounded-xl bg-slate-950/90 border border-cyan-500/30 text-xs font-mono shadow-inner">
                      <div class="flex items-center justify-between text-cyan-300 font-bold mb-1">
                        <span class="truncate">{{ activeLayer.name }}</span>
                        <span class="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-white/5">{{ activeLayer.tech }}</span>
                      </div>
                      <p class="text-[11px] text-indigo-300 mb-2 font-mono truncate">Pattern: {{ activeLayer.pattern }}</p>
                      <ul class="space-y-1 text-[11px] text-slate-300">
                        @for (r of (activeLayer.responsibilities || []).slice(0, 2); track r) {
                          <li class="flex items-start gap-1.5">
                            <span class="text-cyan-400 text-xs leading-none">▹</span>
                            <span class="line-clamp-1">{{ r }}</span>
                          </li>
                        }
                      </ul>
                    </div>
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
                    <span class="px-1.5 py-0.5 rounded-md bg-white/5 text-slate-400" [title]="(p.technologies.length - 4) + ' additional technologies'">
                      +{{ p.technologies.length - 4 }}
                    </span>
                  }
                </div>

                <!-- Product & Architecture Dossier Deep-Dive Button -->
                <button
                  type="button"
                  (click)="profileService.openCockpit(p)"
                  class="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-cyan-600 text-slate-200 hover:text-white border border-white/10 hover:border-cyan-500/50 font-mono text-xs font-semibold transition-all flex items-center justify-center gap-2 group/btn shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  [attr.aria-label]="'Inspect Full System Dossier for ' + p.name"
                >
                  <span>Inspect Full System</span>
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

  // Per-card interactive state: 'overview' vs 'flow'
  readonly cardViews = new Map<string, 'overview' | 'flow'>();
  readonly cardLayers = new Map<string, number>();

  readonly defaultLayers = [
    {
      name: 'Client / Gateway',
      tech: 'Angular 21 / ASP.NET Core',
      pattern: 'Single-Page Client & REST APIs',
      responsibilities: ['Reactive UI rendering', 'Client-side state management', 'JWT authentication interceptors']
    },
    {
      name: 'Application Core',
      tech: 'C# / MediatR CQRS',
      pattern: 'Clean Architecture Use Cases',
      responsibilities: ['Command & Query handlers', 'FluentValidation pipeline behaviors', 'Domain event dispatching']
    },
    {
      name: 'Domain Tier',
      tech: 'C# Domain Aggregates',
      pattern: 'Rich Domain Model & Invariants',
      responsibilities: ['Encapsulated business logic', 'Domain entity invariants', 'Value objects & specifications']
    },
    {
      name: 'Persistence & Cloud',
      tech: 'SQL Server / Redis / S3',
      pattern: 'Repository & Unit of Work',
      responsibilities: ['EF Core relational mappings', 'Distributed Redis caching', 'Cloudflare R2 / Backblaze object storage']
    }
  ];

  getCardView(id: string): 'overview' | 'flow' {
    return this.cardViews.get(id) || 'overview';
  }

  setCardView(id: string, view: 'overview' | 'flow'): void {
    this.cardViews.set(id, view);
  }

  getCardLayer(id: string): number {
    return this.cardLayers.get(id) || 0;
  }

  setCardLayer(id: string, layerIdx: number): void {
    this.cardLayers.set(id, layerIdx);
  }
}