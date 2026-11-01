import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MasterProfile, ProjectItem } from '../models/profile.model';
import profileData from '../data/master-profile.json';

export type FilterMode = 'all' | 'fullstack' | 'backend';
export type CvVariant = 'one-page' | 'detailed';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient, { optional: true });

  // Authoritative Single Source of Truth Signal
  readonly profile = signal<MasterProfile>(profileData as unknown as MasterProfile);

  // Reactive UI State Signals
  readonly activeFilter = signal<FilterMode>('all');
  readonly hoveredSkill = signal<string | null>(null);
  readonly activeSkillFilter = signal<string | null>(null);
  readonly highlightedSkill = computed(() => this.activeSkillFilter() || this.hoveredSkill());

  readonly selectedProject = signal<ProjectItem | null>(null);
  readonly isCockpitOpen = signal<boolean>(false);
  readonly isCvModalOpen = signal<boolean>(false);
  readonly activeCvVariant = signal<CvVariant>('one-page');
  readonly activeArchitectureLayerIndex = signal<number>(0);

  // Computed Projections
  readonly basics = computed(() => this.profile().basics);
  readonly skills = computed(() => this.profile().skills);
  readonly experience = computed(() => this.profile().experience);
  readonly projects = computed(() => this.profile().projects);
  readonly education = computed(() => this.profile().education);
  readonly certifications = computed(() => this.profile().certifications);
  readonly languages = computed(() => this.profile().languages);

  readonly projectCounts = computed(() => {
    const all = this.projects();
    return {
      all: all.length,
      fullstack: all.filter((p) => p.scope === 'Full-Stack Solution').length,
      backend: all.filter((p) => p.scope === 'Backend Architecture').length
    };
  });

  readonly activeSkillMatchCount = computed(() => {
    const skill = this.activeSkillFilter();
    if (!skill) return 0;
    return this.getProjectCountForSkill(skill);
  });

  readonly filteredProjects = computed(() => {
    const list = this.projects();
    const filter = this.activeFilter();
    const activeSkill = this.activeSkillFilter();

    return list.filter((p) => {
      // 1. Skill filter matching
      if (activeSkill && !this.isSkillMatchingProject(activeSkill, p)) {
        return false;
      }

      // 2. Mode filter matching
      if (filter === 'fullstack') return p.scope === 'Full-Stack Solution';
      if (filter === 'backend') return p.scope === 'Backend Architecture';
      return true;
    });
  });

  constructor() {
    this.refreshFromPublicData();
  }

  // Refresh live data from public URL if running in browser
  private refreshFromPublicData(): void {
    if (this.http && typeof window !== 'undefined') {
      this.http.get<MasterProfile>('/data/master-profile.json').subscribe({
        next: (data) => {
          if (data && data.projects) {
            this.profile.set(data);
          }
        },
        error: () => {
          // Defaults already active
        }
      });
    }
  }

  setFilter(mode: FilterMode): void {
    this.activeFilter.set(mode);
  }

  setHoveredSkill(skill: string | null): void {
    this.hoveredSkill.set(skill);
  }

  setHighlightedSkill(skill: string | null): void {
    this.setHoveredSkill(skill);
  }

  setActiveSkillFilter(skill: string | null): void {
    this.activeSkillFilter.set(skill);
    // If setting a skill filter, reset to 'all' so matching projects aren't accidentally hidden by scope tab
    if (skill) {
      this.activeFilter.set('all');
    }
  }

  clearSkillFilter(): void {
    this.activeSkillFilter.set(null);
  }

  normalizeSkillTokens(skill: string): string[] {
    if (!skill) return [];
    const raw = skill.toLowerCase().trim();

    // Specific domain normalizations
    if (raw.includes('.net') || raw === 'c#' || raw.includes('c#')) return ['.net', 'dotnet', 'c#'];
    if (raw.includes('angular')) return ['angular'];
    if (raw.includes('sql server') || raw.includes('t-sql') || raw === 'sql') return ['sql server', 't-sql', 'sql'];
    if (raw.includes('redis')) return ['redis'];
    if (raw.includes('docker')) return ['docker'];
    if (raw.includes('cqrs') || raw.includes('mediatr')) return ['cqrs', 'mediatr'];
    if (raw.includes('clean architecture') || raw.includes('ddd')) return ['clean architecture', 'ddd'];
    if (raw.includes('backblaze') || raw.includes('s3')) return ['backblaze', 's3'];
    if (raw.includes('stripe')) return ['stripe'];
    if (raw.includes('jwt') || raw.includes('session')) return ['jwt', 'session', 'auth'];
    if (raw.includes('signalr')) return ['signalr'];
    if (raw.includes('questpdf')) return ['questpdf'];
    if (raw.includes('quartz')) return ['quartz'];
    if (raw.includes('hangfire')) return ['hangfire'];
    if (raw.includes('dapper')) return ['dapper'];
    if (raw.includes('entity framework') || raw.includes('ef core')) return ['entity framework', 'ef core'];
    if (raw.includes('tailwind')) return ['tailwind'];
    if (raw.includes('blazor')) return ['blazor'];

    // Clean and split by common separators
    const cleaned = raw.replace(/[()[\],/&]/g, ' ');
    const tokens = cleaned
      .split(/\s+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 2 || t === 'c#' || t === 'ui' || t === 's3' || t === 'db');

    return tokens.length ? tokens : [raw];
  }

  isSkillMatchingProject(skill: string, project: ProjectItem): boolean {
    if (!skill || !project) return false;
    const tokens = this.normalizeSkillTokens(skill);
    if (!tokens.length) return false;

    const searchableParts: string[] = [
      project.name,
      project.subtitle,
      project.badge,
      project.summary,
      ...(project.technologies || []),
      ...(project.highlights || []),
      ...(project.backendHighlights || []),
      ...(project.frontendHighlights || []),
      ...(project.securityAndCloudHighlights || [])
    ];

    if (project.architectureLayers) {
      for (const layer of project.architectureLayers) {
        searchableParts.push(layer.name, layer.tech, layer.pattern);
        if (layer.responsibilities) {
          searchableParts.push(...layer.responsibilities);
        }
      }
    }

    const combined = searchableParts.join(' ').toLowerCase();

    return tokens.some((token) => {
      if (token === '.net') {
        return combined.includes('.net') || combined.includes('dotnet') || combined.includes('asp.net');
      }
      if (token === 'c#') {
        return combined.includes('c#') || combined.includes('csharp');
      }
      return combined.includes(token);
    });
  }

  getProjectCountForSkill(skill: string): number {
    return this.projects().filter((p) => this.isSkillMatchingProject(skill, p)).length;
  }

  openCockpit(project: ProjectItem): void {
    this.selectedProject.set(project);
    this.isCockpitOpen.set(true);
    this.activeArchitectureLayerIndex.set(0);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeCockpit(): void {
    this.isCockpitOpen.set(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  nextProject(): void {
    const current = this.selectedProject();
    if (!current) return;
    const list = this.projects();
    const index = list.findIndex((p) => p.id === current.id);
    const nextIndex = (index + 1) % list.length;
    this.selectedProject.set(list[nextIndex]);
    this.activeArchitectureLayerIndex.set(0);
  }

  prevProject(): void {
    const current = this.selectedProject();
    if (!current) return;
    const list = this.projects();
    const index = list.findIndex((p) => p.id === current.id);
    const prevIndex = (index - 1 + list.length) % list.length;
    this.selectedProject.set(list[prevIndex]);
    this.activeArchitectureLayerIndex.set(0);
  }

  openCvModal(variant: CvVariant = 'one-page'): void {
    this.activeCvVariant.set(variant);
    this.isCvModalOpen.set(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeCvModal(): void {
    this.isCvModalOpen.set(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  setCvVariant(variant: CvVariant): void {
    this.activeCvVariant.set(variant);
  }

  getCvDownloadUrl(variant: CvVariant): string {
    return variant === 'one-page'
      ? '/cv/Alber_Ashraf_CV_OnePage.pdf'
      : '/cv/Alber_Ashraf_CV_Detailed.pdf';
  }
}
