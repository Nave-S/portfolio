import { Component } from '@angular/core';
import { LanguageService } from '../../../../app/services/language.service';

@Component({
  selector: 'app-language-switch',
  standalone: true,
  imports: [],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.scss',
})
export class LanguageSwitchComponent {
  constructor(private lang: LanguageService) {}

  get isDe() {
    return this.lang.current() === 'de';
  }

  toggleLanguage(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.lang.use(checked ? 'de' : 'en');
  }
}

