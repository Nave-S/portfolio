import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const KEY = 'language';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);
  private supported = ['en', 'de'] as const;
  private fallback: 'en' | 'de' = 'en';

  constructor() {
    const saved = localStorage.getItem(KEY) ?? '';
    const browser = (this.translate.getBrowserLang() || '').split('-')[0].toLowerCase();
    const initial = this.normalize(saved) ?? this.normalize(browser) ?? this.fallback;

    this.translate.addLangs(this.supported as unknown as string[]);
    this.translate.setFallbackLang(this.fallback);
    this.use(initial);
  }

  use(lang: string) {
    const norm = this.normalize(lang) ?? this.fallback;
    this.translate.use(norm);
    localStorage.setItem(KEY, norm);
  }

  current(): 'en' | 'de' {
    return (this.translate.getCurrentLang() as 'en' | 'de') || this.fallback;
  }

  private normalize(lang: string) {
    if (!lang) return null;
    const short = lang.toLowerCase().split('-')[0];
    return (this.supported as readonly string[]).includes(short) ? short : null;
  }
}

