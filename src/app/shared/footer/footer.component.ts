import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(private lang: LanguageService, private router: Router) {}

  setLang(lang: 'en' | 'de') {
    this.lang.use(lang);
  }

  get current() {
    return this.lang.current();
  }

  navigateToHome() {
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

