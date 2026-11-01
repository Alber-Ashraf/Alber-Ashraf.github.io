import { Component, HostListener, computed, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProfileService, CvVariant } from '../../services/profile.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-cv-modal',
  standalone: true,
  imports: [],
  template: `
    @if (profileService.isCvModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">

        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity"
          (click)="profileService.closeCvModal()"
        ></div>

        <!-- Modal Container -->
        <div
          class="relative w-full max-w-5xl h-[92vh] bg-slate-900 rounded-2xl border border-white/10 shadow-2xl flex flex-col z-10 overflow-hidden"
        >
          <!-- Modal Header -->
          <div class="px-5 py-3.5 border-b border-white/10 bg-slate-950/95 flex flex-wrap items-center justify-between gap-3">

            <!-- Left Info & Variant Switcher -->
            <div class="flex items-center gap-3 sm:gap-4">
              <div>
                <h3 class="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Curriculum Vitae</span>
                  <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    PDF Viewer
                  </span>
                </h3>
                <p class="text-[11px] text-slate-400 font-mono hidden sm:block">Alber Ashraf • Software Engineer</p>
              </div>

              <!-- Switcher Pills -->
              <div class="flex items-center bg-slate-900 p-1 rounded-xl border border-white/10 font-mono text-xs">
                <button
                  (click)="profileService.setCvVariant('one-page')"
                  class="px-3 py-1.5 rounded-lg transition-all"
                  [class]="activeVariant() === 'one-page' ?
                    'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30' :
                    'text-slate-400 hover:text-white'"
                >
                  1-Page CV
                </button>
                <button
                  (click)="profileService.setCvVariant('detailed')"
                  class="px-3 py-1.5 rounded-lg transition-all"
                  [class]="activeVariant() === 'detailed' ?
                    'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30' :
                    'text-slate-400 hover:text-white'"
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
                class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono font-medium border border-white/10 transition-colors"
                title="Open PDF in a new browser tab"
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
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-semibold transition-colors shadow-sm"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download PDF</span>
              </a>

              <button
                (click)="profileService.closeCvModal()"
                class="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 border border-white/10 transition-colors"
                title="Close (ESC)"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

          </div>

          <!-- Modal Body: Reliable iFrame + Object Fallback -->
          <div class="flex-1 bg-slate-950 p-2 sm:p-3 relative overflow-hidden flex flex-col">
            <iframe
              [src]="safePdfUrl()"
              class="w-full h-full rounded-xl border border-white/10 bg-slate-900"
              title="CV Document Previewer"
            >
              <object
                [data]="safePdfUrl()"
                type="application/pdf"
                class="w-full h-full rounded-xl"
              >
                <div class="w-full h-full flex flex-col items-center justify-center p-8 text-center text-slate-300 font-mono text-sm">
                  <p class="text-base font-bold text-white mb-2">{{ activeVariant() === 'one-page' ? '1-Page CV' : 'Detailed CV' }}</p>
                  <p class="text-xs text-slate-400 mb-6 max-w-md">Your browser does not support inline PDF preview. You can open or download the PDF directly.</p>
                  <div class="flex gap-3">
                    <a
                      [href]="activePdfUrl()"
                      target="_blank"
                      class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                    >
                      Open in New Tab ↗
                    </a>
                    <a
                      [href]="activePdfUrl()"
                      [download]="downloadFileName()"
                      class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
                    >
                      Download File ↓
                    </a>
                  </div>
                </div>
              </object>
            </iframe>
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
                class="text-indigo-400 hover:text-indigo-300 sm:hidden"
              >
                Open Tab ↗
              </a>
              <span>Press <kbd class="px-1.5 py-0.5 rounded bg-white/10 text-white">ESC</kbd> to close</span>
            </div>
          </div>

        </div>

      </div>
    }
  `
})
export class CvModalComponent {
  private sanitizer = inject(DomSanitizer);
  readonly profileService = inject(ProfileService);
  readonly toastService = inject(ToastService);

  readonly activeVariant = computed(() => this.profileService.activeCvVariant());

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
