import { Injectable, inject, signal } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class i18nService {
  private currentLanguage = signal<string>('');

  private readonly translocoService = inject(TranslocoService);

  constructor() {
    const lagnStorage = localStorage.getItem('lang');

    if (lagnStorage) {
      this.currentLanguage.set(JSON.parse(lagnStorage));
    }
  }

  public getCurrentLanguage() {
    this.currentLanguage();
  }

  public setCurrentLanguage(lang: string) {
    localStorage.setItem('lang', JSON.stringify(lang));
    this.currentLanguage.set(lang);
    this.translocoService.setActiveLang(lang);
  }

  public clearCurrentLanguage() {
    localStorage.removeItem('lang');
    this.currentLanguage.set('');
  }
}
