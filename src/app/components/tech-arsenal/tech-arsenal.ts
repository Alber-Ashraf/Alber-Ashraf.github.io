import { Component, computed, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { SpotlightTiltDirective } from '../../directives/spotlight-tilt.directive';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

export interface SkillCategoryGroup {
  id: string;
  number: string;
  name: string;
  description: string;
  accent: 'indigo' | 'rose' | 'emerald' | 'amber' | 'cyan';
  skills: string[];
}

@Component({
  selector: 'app-tech-arsenal',
  standalone: true,
  imports: [SpotlightTiltDirective, ScrollRevealDirective],
  template: `
    <section id="skills" class="py-20 relative overflow-hidden bg-blueprint">
      <!-- Ambient Lighting -->
      <div class="absolute bottom-10 right-1/4 w-[450px] h-[300px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <!-- Header -->
        <div class="flex flex-col items-start mb-12 max-w-3xl" appScrollReveal>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-3">
            Core Competencies
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Skills
          </h2>
          <p class="text-slate-400 text-sm sm:text-base leading-relaxed mt-3">
            A comprehensive, verified technical toolkit organized across 5 core engineering domains. Click any skill pill to filter and inspect the systems built with it.
          </p>
        </div>

        <!-- Live Cross-Referenced Active Skill Banner -->
        @if (profileService.activeSkillFilter(); as activeSkill) {
          <div
            class="mb-8 p-4 rounded-xl bg-gradient-to-r from-indigo-950/90 via-slate-900/90 to-cyan-950/90 border border-cyan-500/40 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl"
          >
            <div class="flex items-center gap-3">
              <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span class="text-xs sm:text-sm font-mono text-slate-200">
                Active Skill Filter: <strong class="text-cyan-300 text-sm sm:text-base font-bold">{{ activeSkill }}</strong>
              </span>
              <span class="px-2 py-0.5 rounded-md bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
                Used in {{ getSkillCount(activeSkill) }} Systems
              </span>
            </div>

            <div class="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                (click)="scrollToProjects()"
                class="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium font-mono transition-colors shadow-sm cursor-pointer"
              >
                View Matching Projects ↓
              </button>
              <button
                type="button"
                (click)="clearSkill()"
                class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
              >
                Clear Filter ✕
              </button>
            </div>
          </div>
        }

        <!-- 5-Category Structured Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" appScrollReveal [revealDelay]="100">

          @for (group of categories; track group.id) {
            <div
              class="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl lg:col-span-1"
              [class.md:col-span-2]="group.id === 'cloud-security'"
              appSpotlightTilt
              [maxTilt]="3"
            >
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-[11px] font-mono text-indigo-400 uppercase tracking-wider">{{ group.number }}</span>
                  <span
                    class="w-2 h-2 rounded-full"
                    [class]="group.accent === 'indigo' ? 'bg-indigo-400' :
                             group.accent === 'rose' ? 'bg-rose-400' :
                             group.accent === 'emerald' ? 'bg-emerald-400' :
                             group.accent === 'amber' ? 'bg-amber-400' : 'bg-cyan-400'"
                  ></span>
                </div>

                <h3 class="text-lg font-bold text-white mb-1 tracking-tight">{{ group.name }}</h3>
                <p class="text-slate-400 text-xs mb-5">{{ group.description }}</p>

                <!-- Skill Interactive Pills -->
                <div class="flex flex-wrap gap-2">
                  @for (skill of group.skills; track skill) {
                    @let count = getSkillCount(skill);
                    @let isActive = profileService.activeSkillFilter() === skill;
                    <button
                      type="button"
                      (click)="onSkillClick(skill)"
                      (mouseenter)="profileService.setHoveredSkill(skill)"
                      (mouseleave)="profileService.setHoveredSkill(null)"
                      class="px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all border text-left flex items-center gap-1.5 cursor-pointer group/pill"
                      [class]="isActive ?
                        'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-500/25 font-bold scale-105' :
                        'bg-slate-900/80 text-slate-300 border-white/10 hover:border-cyan-500/40 hover:text-white hover:bg-slate-800'"
                      [title]="'Filter projects by ' + skill + ' (' + count + ' systems)'"
                    >
                      <span>{{ skill }}</span>
                      @if (count > 0) {
                        <span
                          class="px-1 py-0.2 rounded text-[10px] font-bold"
                          [class]="isActive ? 'bg-black/30 text-white' : 'bg-white/5 text-slate-400 group-hover/pill:text-cyan-300 group-hover/pill:bg-cyan-500/10'"
                        >
                          {{ count }}
                        </span>
                      }
                    </button>
                  }
                </div>
              </div>

              <div class="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{{ group.skills.length }} Technologies</span>
                <span class="text-cyan-400/80">Click to filter</span>
              </div>
            </div>
          }

        </div>

      </div>
    </section>
  `
})
export class TechArsenalComponent {
  readonly profileService = inject(ProfileService);

  readonly categories: SkillCategoryGroup[] = [
    {
      id: 'backend',
      number: 'Category 01',
      name: 'Backend Engineering',
      description: 'C#, .NET runtime, Web APIs, ORMs, and transactional persistence.',
      accent: 'indigo',
      skills: [
        'C#',
        '.NET 9',
        '.NET 8',
        '.NET Framework',
        'ASP.NET Core Web API',
        'Minimal APIs',
        'ASP.NET Core MVC',
        'ASP.NET Web Forms',
        'Entity Framework Core',
        'Dapper',
        'ADO.NET',
        'LINQ'
      ]
    },
    {
      id: 'frontend',
      number: 'Category 02',
      name: 'Frontend Engineering',
      description: 'Single-page client architecture, reactivity, SSR, and design tokens.',
      accent: 'rose',
      skills: [
        'Angular 21',
        'Angular 20',
        'Angular Signals',
        'Server-Side Rendering (SSR)',
        'RxJS',
        'TypeScript',
        'JavaScript',
        'Blazor WebAssembly',
        'Tailwind CSS v4',
        'Bootstrap 5.3',
        'HTML5/CSS3'
      ]
    },
    {
      id: 'architecture',
      number: 'Category 03',
      name: 'Architecture & System Design',
      description: 'Enterprise patterns, domain boundaries, and architectural enforcement.',
      accent: 'amber',
      skills: [
        'Clean Architecture',
        'Domain-Driven Design (DDD)',
        'CQRS',
        'MediatR',
        'Repository & Unit of Work',
        'Result Pattern',
        'Specification Pattern',
        'NetArchTest (Architecture CI)'
      ]
    },
    {
      id: 'databases',
      number: 'Category 04',
      name: 'Databases, Caching & Background Processing',
      description: 'Relational query optimization, caching layers, and scheduled jobs.',
      accent: 'emerald',
      skills: [
        'SQL Server (T-SQL)',
        'Stored Procedures',
        'Execution Plan & Index Optimization',
        'PostgreSQL',
        'Redis',
        'Hangfire',
        'Quartz.NET',
        'ClosedXML',
        'QuestPDF'
      ]
    },
    {
      id: 'cloud-security',
      number: 'Category 05',
      name: 'Cloud, DevOps & Security',
      description: 'Cloud storage, containerization, CI/CD, and identity protection.',
      accent: 'cyan',
      skills: [
        'Cloudflare R2',
        'Backblaze B2 (S3)',
        'AWS S3',
        'Docker',
        'Git',
        'GitHub Actions CI/CD',
        'xUnit',
        'ASP.NET Core Identity',
        'JWT & Refresh Token Rotation',
        'OAuth2',
        'OWASP Security',
        'Stripe & PayMob Integrations'
      ]
    }
  ];

  getSkillCount(skill: string): number {
    return this.profileService.getProjectCountForSkill(skill);
  }

  onSkillClick(skill: string): void {
    if (this.profileService.activeSkillFilter() === skill) {
      this.clearSkill();
    } else {
      this.profileService.setActiveSkillFilter(skill);
      this.scrollToProjects();
    }
  }

  clearSkill(): void {
    this.profileService.clearSkillFilter();
  }

  scrollToProjects(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const targetElement = document.getElementById('projects');
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
