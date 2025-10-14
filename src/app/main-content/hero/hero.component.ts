import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { LanguageService } from '../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NavbarComponent, CommonModule, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  constructor(private lang: LanguageService) {}

  tickerKeys = ['HERO.TICKER.REMOTE', 'HERO.TICKER.ROLE', 'HERO.TICKER.BASED', 'HERO.TICKER.OPEN'];
  repeatArray = Array.from({ length: 16 });

  setLang(lang: 'en' | 'de') {
    this.lang.use(lang);
  }

  get current() {
    return this.lang.current();
  }
}

