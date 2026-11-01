import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [],
  template: `
    <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="pointer-events-auto flex items-center justify-between p-4 rounded-xl border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300 transform translate-y-0"
          [class]="toast.type === 'success' ? 'bg-slate-900/90 text-emerald-400 border-emerald-500/30' :
                   toast.type === 'accent' ? 'bg-slate-900/90 text-indigo-400 border-indigo-500/30' :
                   'bg-slate-900/90 text-slate-200 border-white/10'"
        >
          <div class="flex items-center gap-3">
            @if (toast.type === 'success') {
              <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            } @else {
              <svg class="w-5 h-5 flex-shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            <span class="text-sm font-medium tracking-wide">{{ toast.text }}</span>
          </div>
          <button
            (click)="toastService.dismiss(toast.id)"
            class="text-slate-400 hover:text-white transition-colors p-1"
            aria-label="Close notification"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      }
    </div>
  `
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);
}
