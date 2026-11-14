import { Component, HostListener, signal, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

export type CockpitTab = 'product' | 'modules' | 'architecture' | 'tech';

@Component({
  selector: 'app-project-cockpit',
  standalone: true,
  imports: [],
  template: `
    @if (profileService.isCockpitOpen() && profileService.selectedProject(); as p) {
      <div class="fixed inset-0 z-50 overflow-hidden flex items-end md:items-stretch justify-end">

        <!-- Backdrop with Blur -->
        <div
          class="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
          (click)="profileService.closeCockpit()"
        ></div>

        <!-- Slide-Over Drawer / 92vh Mobile Bottom Sheet Container -->
        <div
          class="relative w-full max-w-4xl bg-slate-950 border-t md:border-t-0 md:border-l border-white/15 shadow-2xl flex flex-col h-[92vh] md:h-full rounded-t-2xl md:rounded-none z-10 overflow-hidden animate-in slide-in-from-bottom md:slide-in-from-right duration-300"
        >
          <!-- Mobile Bottom-Sheet Pill Handle -->
          <div class="w-12 h-1.5 rounded-full bg-white/20 mx-auto mt-2.5 mb-0.5 md:hidden flex-shrink-0"></div>

          <!-- Drawer Sticky Header -->
          <div class="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-slate-900/95 backdrop-blur-xl flex items-center justify-between gap-2 flex-shrink-0">
            <div class="flex items-center gap-2 min-w-0">
              <span class="px-2 py-1 rounded-md bg-indigo-500/20 text-indigo-300 font-mono text-[11px] border border-indigo-500/30 flex-shrink-0">
                0{{ getProjectIndex(p.id) + 1 }}
              </span>
              <span class="font-bold text-white text-sm sm:text-base truncate">{{ p.name }}</span>
              <span
                class="hidden sm:inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono border flex-shrink-0"
                [class]="p.scope === 'Full-Stack Solution' ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'"
              >
                {{ p.scope }}
              </span>
            </div>

            <!-- Action Controls (Live Link, Prev, Next, Close) -->
            <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              @if (p.scope === 'Full-Stack Solution' && p.liveUrl) {
                <a
                  [href]="p.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] sm:text-xs font-mono font-semibold transition-colors shadow-sm"
                  title="Launch Live Production System"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  <span class="hidden xs:inline">Live</span>
                  <span>↗</span>
                </a>
              }

              <button
                type="button"
                (click)="profileService.prevProject()"
                class="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Previous System (Left Arrow)"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                (click)="profileService.nextProject()"
                class="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Next System (Right Arrow)"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                type="button"
                (click)="profileService.closeCockpit()"
                class="px-2.5 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 hover:text-white border border-rose-500/30 transition-colors ml-0.5 font-mono text-xs font-bold flex items-center gap-1 cursor-pointer"
                title="Close (ESC)"
              >
                <span>Close</span>
                <span>✕</span>
              </button>
            </div>
          </div>

          <!-- Drawer Scrollable Body -->
          <div class="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 sm:space-y-8">

            <!-- Title & Quick Summary Header -->
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-2">
                <h3 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{{ p.name }}</h3>
                @if (p.scope === 'Full-Stack Solution' && p.liveUrl) {
                  <a
                    [href]="p.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono hover:bg-emerald-500/25 transition-all"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Launch Live Product ↗</span>
                  </a>
                }
              </div>
              <p class="text-indigo-300 font-mono text-xs sm:text-sm mb-3">{{ p.subtitle }}</p>
              <p class="text-slate-300 text-sm sm:text-base leading-relaxed">{{ p.productOverview || p.summary }}</p>
            </div>

            <!-- Horizontally Scrollable Content Tabs -->
            <div class="border-b border-white/10 flex overflow-x-auto no-scrollbar whitespace-nowrap gap-2 font-mono text-xs">
              <button
                type="button"
                (click)="activeTab.set('product')"
                class="pb-3 px-3.5 border-b-2 transition-all font-semibold flex-shrink-0 cursor-pointer"
                [class]="activeTab() === 'product' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'"
              >
                1. Product & Business Value
              </button>
              <button
                type="button"
                (click)="activeTab.set('modules')"
                class="pb-3 px-3.5 border-b-2 transition-all font-semibold flex-shrink-0 cursor-pointer"
                [class]="activeTab() === 'modules' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'"
              >
                2. Key Product Modules ({{ (p.keyModules || []).length }})
              </button>
              <button
                type="button"
                (click)="activeTab.set('architecture')"
                class="pb-3 px-3.5 border-b-2 transition-all font-semibold flex-shrink-0 cursor-pointer"
                [class]="activeTab() === 'architecture' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'"
              >
                3. System Architecture
              </button>
              <button
                type="button"
                (click)="activeTab.set('tech')"
                class="pb-3 px-3.5 border-b-2 transition-all font-semibold flex-shrink-0 cursor-pointer"
                [class]="activeTab() === 'tech' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'"
              >
                4. Tech Stack ({{ p.technologies.length }})
              </button>
            </div>

            <!-- TAB 1: Product Overview & Business Value -->
            @if (activeTab() === 'product') {
              <div class="space-y-6">

                <!-- Problem vs Solution Bento -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="p-5 rounded-xl bg-slate-900/60 border border-white/10">
                    <span class="text-xs font-mono uppercase text-rose-400 tracking-wider block mb-2 font-bold">
                      The Business Problem
                    </span>
                    <p class="text-slate-300 text-sm leading-relaxed">{{ p.caseStudy.problem }}</p>
                  </div>
                  <div class="p-5 rounded-xl bg-slate-900/60 border border-white/10">
                    <span class="text-xs font-mono uppercase text-emerald-400 tracking-wider block mb-2 font-bold">
                      The Engineered Solution
                    </span>
                    <p class="text-slate-300 text-sm leading-relaxed">{{ p.caseStudy.solution }}</p>
                  </div>
                </div>

                <!-- Verified Impact Metrics -->
                @if (p.metrics) {
                  <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono flex items-center gap-3">
                    <svg class="w-5 h-5 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span><strong>Verified System Metric:</strong> {{ p.metrics }}</span>
                  </div>
                }

                <!-- Core Highlights -->
                <div>
                  <h4 class="text-xs font-mono uppercase text-indigo-400 tracking-wider mb-3">
                    Key Engineering Achievements:
                  </h4>
                  <div class="space-y-2.5">
                    @for (bullet of p.highlights; track bullet) {
                      <div class="p-3.5 rounded-xl bg-slate-900/50 border border-white/5 text-sm text-slate-200 flex items-start gap-3">
                        <span class="text-indigo-400 text-sm mt-0.5">▹</span>
                        <span class="leading-relaxed">{{ bullet }}</span>
                      </div>
                    }
                  </div>
                </div>

              </div>
            }

            <!-- TAB 2: Key Product Modules & Features -->
            @if (activeTab() === 'modules') {
              <div class="space-y-4">
                <p class="text-slate-400 text-xs sm:text-sm">
                  Functional system modules delivering core business workflows across this platform:
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  @for (mod of (p.keyModules || []); track mod.name) {
                    <div class="p-5 rounded-xl bg-slate-900/70 border border-white/10 flex flex-col justify-between">
                      <div>
                        <div class="flex items-center gap-2 mb-2">
                          <span class="w-2 h-2 rounded-full bg-indigo-400"></span>
                          <h4 class="text-sm font-bold text-white tracking-tight">{{ mod.name }}</h4>
                        </div>
                        <p class="text-xs text-slate-300 leading-relaxed mb-4">{{ mod.description }}</p>

                        <div class="space-y-1.5 border-t border-white/5 pt-3">
                          <span class="text-[10px] uppercase font-mono text-slate-500 tracking-wider block">Key Capabilities:</span>
                          @for (cap of mod.capabilities; track cap) {
                            <div class="flex items-start gap-2 text-xs text-slate-300 font-mono">
                              <span class="text-indigo-400">✓</span>
                              <span>{{ cap }}</span>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- TAB 3: System Architecture & Engineering Highlights -->
            @if (activeTab() === 'architecture') {
              <div class="space-y-6">

                <!-- Live Interactive Architectural Flow Vector Diagram -->
                <div class="w-full rounded-2xl bg-slate-950/90 border border-white/10 p-4 shadow-xl">
                  <div class="flex items-center justify-between mb-3 text-xs font-mono">
                    <span class="text-cyan-400 uppercase tracking-wider font-semibold">Interactive Pipeline Blueprint (Click Node to Inspect)</span>
                    <span class="text-emerald-400 flex items-center gap-1.5 text-[11px]">
                      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      Live Flow
                    </span>
                  </div>

                  <div class="h-24 w-full bg-slate-900/60 rounded-xl border border-white/5 p-2 flex items-center justify-between overflow-x-auto no-scrollbar">
                    <svg class="w-full min-w-[500px] h-full" viewBox="0 0 520 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <!-- Stage 1: Client / Public API Entry -->
                      <g transform="translate(10, 8)" (click)="selectedLayerIndex.set(0)" class="cursor-pointer">
                        <rect
                          width="100"
                          height="54"
                          rx="8"
                          [attr.fill]="selectedLayerIndex() === 0 ? '#082f49' : '#0B0F19'"
                          [attr.stroke]="selectedLayerIndex() === 0 ? '#38BDF8' : '#06B6D4'"
                          [attr.stroke-width]="selectedLayerIndex() === 0 ? '2.2' : '1.2'"
                        />
                        <text x="50" y="24" fill="#06B6D4" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">01 ENTRY / UI</text>
                        <text x="50" y="38" fill="#E2E8F0" font-size="7.5" font-family="monospace" text-anchor="middle">Client / API Gate</text>
                        <circle cx="12" cy="18" r="2.5" fill="#06B6D4" />
                      </g>

                      <!-- Connector 1 -->
                      <line x1="110" y1="35" x2="145" y2="35" stroke="#06B6D4" stroke-width="1.8" class="animate-data-flow" />

                      <!-- Stage 2: Application / MediatR CQRS -->
                      <g transform="translate(145, 8)" (click)="selectedLayerIndex.set(1)" class="cursor-pointer">
                        <rect
                          width="105"
                          height="54"
                          rx="8"
                          [attr.fill]="selectedLayerIndex() === 1 ? '#1e1b4b' : '#0B0F19'"
                          [attr.stroke]="selectedLayerIndex() === 1 ? '#818CF8' : '#6366F1'"
                          [attr.stroke-width]="selectedLayerIndex() === 1 ? '2.2' : '1.2'"
                        />
                        <text x="52" y="24" fill="#818CF8" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">02 APPLICATION</text>
                        <text x="52" y="38" fill="#E2E8F0" font-size="7.5" font-family="monospace" text-anchor="middle">CQRS &amp; Handlers</text>
                        <circle cx="12" cy="18" r="2.5" fill="#6366F1" />
                      </g>

                      <!-- Connector 2 -->
                      <line x1="250" y1="35" x2="285" y2="35" stroke="#6366F1" stroke-width="1.8" class="animate-data-flow" />

                      <!-- Stage 3: Domain Core Entities -->
                      <g transform="translate(285, 8)" (click)="selectedLayerIndex.set(2)" class="cursor-pointer">
                        <rect
                          width="105"
                          height="54"
                          rx="8"
                          [attr.fill]="selectedLayerIndex() === 2 ? '#2e1065' : '#0B0F19'"
                          [attr.stroke]="selectedLayerIndex() === 2 ? '#C084FC' : '#8B5CF6'"
                          [attr.stroke-width]="selectedLayerIndex() === 2 ? '2.2' : '1.5'"
                        />
                        <text x="52" y="24" fill="#C084FC" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">03 DOMAIN CORE</text>
                        <text x="52" y="38" fill="#E2E8F0" font-size="7.5" font-family="monospace" text-anchor="middle">Aggregates &amp; Rules</text>
                        <circle cx="52" cy="46" r="3" fill="#8B5CF6" class="animate-ping" />
                      </g>

                      <!-- Connector 3 -->
                      <line x1="390" y1="35" x2="425" y2="35" stroke="#10B981" stroke-width="1.8" class="animate-data-flow" />

                      <!-- Stage 4: Infrastructure & Storage -->
                      <g transform="translate(425, 8)" (click)="selectedLayerIndex.set(3)" class="cursor-pointer">
                        <rect
                          width="85"
                          height="54"
                          rx="8"
                          [attr.fill]="selectedLayerIndex() === 3 ? '#064e3b' : '#0B0F19'"
                          [attr.stroke]="selectedLayerIndex() === 3 ? '#34D399' : '#10B981'"
                          [attr.stroke-width]="selectedLayerIndex() === 3 ? '2.2' : '1.2'"
                        />
                        <text x="42" y="24" fill="#34D399" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">04 DATA/CLOUD</text>
                        <text x="42" y="38" fill="#E2E8F0" font-size="7.5" font-family="monospace" text-anchor="middle">SQL / Redis / S3</text>
                        <circle cx="12" cy="18" r="2.5" fill="#10B981" />
                      </g>
                    </svg>
                  </div>
                </div>

                <!-- Interactive Architecture Layers -->
                <div class="bg-slate-900/90 rounded-2xl p-5 border border-white/10 shadow-xl">
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-xs font-mono uppercase text-indigo-400 tracking-wider">
                      Architectural Layers & Isolation
                    </span>
                    <span class="text-[11px] font-mono text-slate-400">Click layer to inspect</span>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    @for (layer of (p.architectureLayers || defaultLayers); track layer.name; let lIdx = $index) {
                      <div
                        (click)="selectedLayerIndex.set(lIdx)"
                        class="p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between"
                        [class]="selectedLayerIndex() === lIdx ?
                          'bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-600/20' :
                          'bg-slate-950/70 border-white/10 hover:border-white/20 hover:bg-slate-900'"
                      >
                        <div>
                          <div class="flex items-center justify-between text-[10px] font-mono mb-2">
                            <span [class]="selectedLayerIndex() === lIdx ? 'text-indigo-300 font-bold' : 'text-slate-500'">
                              LAYER 0{{ lIdx + 1 }}
                            </span>
                            <span class="w-1.5 h-1.5 rounded-full" [class]="selectedLayerIndex() === lIdx ? 'bg-indigo-400' : 'bg-slate-700'"></span>
                          </div>
                          <h5 class="text-xs font-bold text-white mb-1">{{ layer.name }}</h5>
                          <p class="text-[11px] text-slate-400 font-mono line-clamp-1">{{ layer.tech }}</p>
                        </div>

                        <div class="mt-3 pt-2 border-t border-white/5 text-[10px] font-mono text-indigo-400">
                          {{ layer.pattern }}
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Active Layer Responsibilities Detail -->
                  @let activeLayer = (p.architectureLayers || defaultLayers)[selectedLayerIndex()];
                  @if (activeLayer) {
                    <div class="mt-4 p-4 rounded-xl bg-slate-950/80 border border-indigo-500/20 font-mono text-xs">
                      <div class="flex items-center justify-between text-indigo-300 mb-2 font-bold">
                        <span>{{ activeLayer.name }} • Enforced Boundaries</span>
                        <span class="text-slate-500 text-[10px]">{{ activeLayer.tech }}</span>
                      </div>
                      <ul class="space-y-1.5 text-slate-300">
                        @for (r of activeLayer.responsibilities; track r) {
                          <li class="flex items-start gap-2">
                            <span class="text-emerald-400">▹</span>
                            <span>{{ r }}</span>
                          </li>
                        }
                      </ul>
                    </div>
                  }
                </div>

                <!-- Architecture Decision Records (ADRs) -->
                <div>
                  <h4 class="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3">Architecture Decisions:</h4>
                  <div class="space-y-2">
                    @for (adr of p.caseStudy.architectureDecisions; track adr) {
                      <div class="p-3.5 rounded-xl bg-slate-900/40 border border-white/5 text-sm text-slate-300 flex items-start gap-3">
                        <span class="px-2 py-0.5 rounded bg-white/5 text-indigo-300 font-mono text-[11px] flex-shrink-0">ADR</span>
                        <span class="text-xs sm:text-sm">{{ adr }}</span>
                      </div>
                    }
                  </div>
                </div>

              </div>
            }

            <!-- TAB 4: Tech Stack Used -->
            @if (activeTab() === 'tech') {
              <div class="space-y-4">
                <p class="text-slate-400 text-xs sm:text-sm">
                  Complete technical stack implemented across this system:
                </p>

                <div class="flex flex-wrap gap-2.5">
                  @for (t of p.technologies; track t) {
                    <span class="px-3.5 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-200">
                      {{ t }}
                    </span>
                  }
                </div>
              </div>
            }

          </div>

          <!-- Drawer Footer Nav Bar -->
          <div class="p-4 border-t border-white/10 bg-slate-900/90 flex items-center justify-between font-mono text-xs text-slate-400">
            <span>Press <kbd class="px-1.5 py-0.5 rounded bg-white/10 text-white">ESC</kbd> to close</span>
            <div class="flex items-center gap-3">
              <button
                (click)="profileService.prevProject()"
                class="text-indigo-400 hover:text-white transition-colors"
              >
                ← Prev System
              </button>
              <span>•</span>
              <button
                (click)="profileService.nextProject()"
                class="text-indigo-400 hover:text-white transition-colors"
              >
                Next System →
              </button>
            </div>
          </div>

        </div>

      </div>
    }
  `
})
export class ProjectCockpitComponent {
  readonly profileService = inject(ProfileService);
  readonly activeTab = signal<CockpitTab>('product');
  readonly selectedLayerIndex = signal<number>(0);

  readonly defaultLayers = [
    { name: 'Client Presentation', tech: 'Angular / Razor / Blazor', pattern: 'Component UI', responsibilities: ['Reactive state', 'Client validation'] },
    { name: 'API Gateway & Security', tech: 'ASP.NET Core Web API', pattern: 'JWT & Rate Limiting', responsibilities: ['Route handling', 'Role authorization'] },
    { name: 'Domain & Core Logic', tech: 'C# .NET 9', pattern: 'MediatR CQRS & DDD', responsibilities: ['Domain aggregates', 'Business rules'] },
    { name: 'Persistence & Infrastructure', tech: 'SQL Server / EF Core / S3', pattern: 'Repository & Storage', responsibilities: ['Transactional persistence', 'Cloud assets'] }
  ];

  getProjectIndex(id: string): number {
    return this.profileService.projects().findIndex((p) => p.id === id);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(e: KeyboardEvent): void {
    if (!this.profileService.isCockpitOpen()) return;

    if (e.key === 'Escape') {
      this.profileService.closeCockpit();
    } else if (e.key === 'ArrowRight') {
      this.profileService.nextProject();
    } else if (e.key === 'ArrowLeft') {
      this.profileService.prevProject();
    }
  }
}
