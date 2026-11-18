import { Component, HostListener, OnInit, OnDestroy, computed, inject, signal, effect } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CdkTrapFocus, LiveAnnouncer } from '@angular/cdk/a11y';
import { ProfileService, CvVariant } from '../../services/profile.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-cv-modal',
  standalone: true,
  imports: [CdkTrapFocus],
  template: `
    @if (profileService.isCvModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">

        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity"
          (click)="profileService.closeCvModal()"
          aria-hidden="true"
        ></div>

        <!-- Modal Container -->
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-title"
          aria-describedby="cv-modal-description"
          cdkTrapFocus
          [cdkTrapFocusAutoCapture]="true"
          class="relative w-full max-w-5xl h-[92vh] bg-slate-900 rounded-t-2xl md:rounded-2xl border-t md:border border-white/10 shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-bottom md:fade-in duration-300"
        >
          <!-- Mobile Bottom-Sheet Pill Handle -->
          <div class="w-12 h-1.5 rounded-full bg-white/20 mx-auto mt-2.5 mb-0.5 md:hidden flex-shrink-0" aria-hidden="true"></div>

          <!-- Modal Header -->
          <div class="px-4 sm:px-5 py-3.5 border-b border-white/10 bg-slate-950/95 flex flex-wrap items-center justify-between gap-2.5">

            <!-- Left Info & Variant Switcher -->
            <div class="flex flex-wrap items-center gap-2.5 sm:gap-4">
              <div>
                <h3 id="cv-modal-title" class="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Curriculum Vitae</span>
                  <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    PDF Viewer
                  </span>
                </h3>
                <p id="cv-modal-description" class="text-[11px] text-slate-400 font-mono hidden sm:block">Alber Ashraf • Software Engineer Curriculum Vitae</p>
              </div>

              <!-- Switcher Pills -->
              <div role="radiogroup" aria-label="CV Variant Selection" class="flex items-center bg-slate-900 p-1 rounded-xl border border-white/10 font-mono text-xs">
                <button
                  type="button"
                  role="radio"
                  [attr.aria-checked]="activeVariant() === 'one-page'"
                  (click)="profileService.setCvVariant('one-page')"
                  class="min-h-[44px] px-3.5 py-2 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  [class]="activeVariant() === 'one-page' ?
                    'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30' :
                    'text-slate-400 hover:text-white'"
                  aria-label="Select 1-Page Executive CV"
                >
                  1-Page CV
                </button>
                <button
                  type="button"
                  role="radio"
                  [attr.aria-checked]="activeVariant() === 'detailed'"
                  (click)="profileService.setCvVariant('detailed')"
                  class="min-h-[44px] px-3.5 py-2 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  [class]="activeVariant() === 'detailed' ?
                    'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30' :
                    'text-slate-400 hover:text-white'"
                  aria-label="Select 2-Page Detailed CV"
                >
                  Detailed CV
                </button>
              </div>
            </div>

            <!-- Right Controls: Open in New Tab, Download & Close -->
            <div class="flex items-center gap-2">
              <a
                [href]="activePdfUrl()"
                target="_blank"
                rel="noopener noreferrer"
                class="hidden sm:inline-flex min-h-[44px] items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono font-medium border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                title="Open PDF in a new browser tab"
                aria-label="Open PDF in a new browser tab"
              >
                <span>Open in New Tab</span>
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              <a
                [href]="activePdfUrl()"
                [download]="downloadFileName()"
                (click)="toastService.show('Downloading ' + downloadFileName(), 'info')"
                class="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-semibold transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                [attr.aria-label]="'Download ' + downloadFileName()"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span class="hidden sm:inline">Download</span>
              </a>

              <button
                type="button"
                (click)="profileService.closeCvModal()"
                cdkFocusInitial
                class="min-h-[44px] min-w-[44px] px-3 py-2 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 hover:text-white border border-rose-500/30 transition-colors font-mono text-xs font-bold inline-flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                title="Close (ESC)"
                aria-label="Close CV preview modal"
              >
                ✕
              </button>
            </div>

          </div>

          <!-- Modal Body: Native Mobile Card Fallback vs Desktop iFrame -->
          <div class="flex-1 bg-slate-950 p-3 sm:p-4 relative overflow-y-auto flex flex-col">
            @if (isMobileViewport()) {
              <!-- Crisp Native Mobile Preview Card (Bypasses Mobile iFrame PDF Blocking) -->
              <div class="flex-1 flex flex-col items-center justify-center p-5 sm:p-8 text-center rounded-2xl bg-slate-900/90 border border-white/10 shadow-inner my-auto">
                <div class="w-16 h-16 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center mb-4 shadow-lg">
                  <svg class="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>

                <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono mb-3">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>ATS Score: 100/100 Verified</span>
                </div>

                <h4 class="text-lg font-extrabold text-white mb-1">
                  {{ activeVariant() === 'one-page' ? 'Executive 1-Page CV' : 'Detailed 2-Page CV' }}
                </h4>
                <p class="text-xs font-mono text-indigo-300 mb-3">{{ downloadFileName() }}</p>
                <p class="text-xs text-slate-400 max-w-sm leading-relaxed mb-6">
                  {{ activeVariant() === 'one-page'
                    ? 'High-density single-page A4 resume featuring 4 flagship Full-Stack systems, Athhan Solutions experience, and core engineering skills.'
                    : 'Comprehensive 2-page A4 architectural dossier covering all 9 production software systems, database optimization, and honors.' }}
                </p>

                <div class="w-full max-w-xs flex flex-col gap-3 font-mono text-xs">
                  <a
                    [href]="activePdfUrl()"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-full min-h-[44px] py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold shadow-lg flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    aria-label="Open PDF in new tab"
                  >
                    <span>Open PDF in Browser</span>
                    <span>↗</span>
                  </a>
                  <a
                    [href]="activePdfUrl()"
                    [download]="downloadFileName()"
                    (click)="toastService.show('Downloading ' + downloadFileName(), 'info')"
                    class="w-full min-h-[44px] py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/15 text-slate-200 font-semibold flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    [attr.aria-label]="'Download ' + downloadFileName()"
                  >
                    <span>Download PDF</span>
                    <span>↓</span>
                  </a>
                </div>
              </div>
            } @else {
              <iframe
                [src]="safePdfUrl()"
                class="w-full h-full rounded-xl border border-white/10 bg-slate-900"
                title="Curriculum Vitae Document Previewer"
              ></iframe>
            }
          </div>

          <!-- Modal Footer -->
          <div class="px-5 py-2.5 border-t border-white/10 bg-slate-950/95 flex items-center justify-between font-mono text-xs text-slate-400">
            <span class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Single Source of Truth • ATS-Compliant PDF</span>
            </span>
            <div class="flex items-center gap-4">
              <a
                [href]="activePdfUrl()"
                target="_blank"
                rel="noopener noreferrer"
                class="min-h-[44px] px-3 inline-flex items-center justify-center text-indigo-400 hover:text-indigo-300 sm:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                aria-label="Open PDF in a new browser tab"
              >
                Open Tab ↗
              </a>
              <span class="hidden sm:inline">Press <kbd class="px-1.5 py-0.5 rounded bg-white/10 text-white">ESC</kbd> to close</span>
            </div>
          </div>

        </div>

      </div>
    }
  `
})
export class CvModalComponent implements OnInit, OnDestroy {
  private sanitizer = inject(DomSanitizer);
  readonly profileService = inject(ProfileService);
  readonly toastService = inject(ToastService);
  private liveAnnouncer = inject(LiveAnnouncer);

  readonly isMobileViewport = signal<boolean>(false);
  readonly activeVariant = computed(() => this.profileService.activeCvVariant());

  constructor() {
    effect(() => {
      const isOpen = this.profileService.isCvModalOpen();
      const variant = this.profileService.activeCvVariant();
      if (isOpen) {
        const name = variant === 'one-page' ? '1-Page Executive CV' : '2-Page Detailed CV';
        this.liveAnnouncer.announce(`Curriculum Vitae modal opened: ${name}. Press Escape to close.`, 'polite');
      }
    });
  }

  ngOnInit(): void {
    this.checkViewport();
  }

  ngOnDestroy(): void {
    // Angular handles host listener teardown automatically
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkViewport();
  }

  private checkViewport(): void {
    if (typeof window !== 'undefined') {
      this.isMobileViewport.set(window.innerWidth < 768);
    }
  }

  readonly activePdfUrl = computed(() => {
    return this.activeVariant() === 'one-page'
      ? 'assets/cv/Alber_Ashraf_CV_OnePage.pdf'
      : 'assets/cv/Alber_Ashraf_CV_Detailed.pdf';
  });

  readonly safePdfUrl = computed<SafeResourceUrl>(() => {
    const url = this.activePdfUrl();
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  readonly downloadFileName = computed(() => {
    return this.activeVariant() === 'one-page'
      ? 'Alber_Ashraf_CV_OnePage.pdf'
      : 'Alber_Ashraf_CV_Detailed.pdf';
  });

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(e: KeyboardEvent): void {
    if (this.profileService.isCvModalOpen() && e.key === 'Escape') {
      this.profileService.closeCvModal();
    }
  }
}
