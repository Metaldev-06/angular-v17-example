import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { i18nService } from './core/services/transloco/i18n.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'portfolio-v4';

  private readonly translocoService = inject(TranslocoService);
  private readonly i18nService = inject(i18nService);

  ngOnInit(): void {
    this.getLang();
  }

  getLang() {
    const lang = JSON.parse(localStorage.getItem('lang') || '');
    const userLang = navigator.language;
    var codeLang = userLang.split('-')[0];

    if (codeLang === 'es' || codeLang === 'en') {
      this.i18nService.setCurrentLanguage(codeLang);
      return;
    }

    if (lang) {
      this.i18nService.setCurrentLanguage(lang);
    } else {
      this.i18nService.setCurrentLanguage(
        this.translocoService.getActiveLang(),
      );
    }
  }
}
