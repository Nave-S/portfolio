import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { LanguageService } from '../services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [NavbarComponent, TranslateModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss',
})
export class ImprintComponent implements OnInit {
  constructor(private lang: LanguageService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  setLang(lang: 'en' | 'de') {
    this.lang.use(lang);
  }

  get current() {
    return this.lang.current();
  }
}
