import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'accent';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSignal = signal<ToastMessage[]>([]);
  readonly toasts = this.toastsSignal.asReadonly();

  show(text: string, type: 'success' | 'info' | 'accent' = 'success', duration = 3000): void {
    const id = Math.random().toString(36).substring(2, 9);
    const toast: ToastMessage = { id, text, type };
    this.toastsSignal.update((list) => [...list, toast]);

    setTimeout(() => {
      this.dismiss(id);
    }, duration);
  }

  dismiss(id: string): void {
    this.toastsSignal.update((list) => list.filter((t) => t.id !== id));
  }
}
