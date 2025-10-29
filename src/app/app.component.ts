import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainContentComponent } from './main-content/main-content-component';
import { FooterComponent } from './shared/footer/footer.component';
import { ImprintComponent } from './imprint/imprint.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainContentComponent, FooterComponent, ImprintComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  isLoading = true;

  ngOnInit() {
    document.body.classList.add('loading');
    this.preloadResources();
  }

  private preloadResources() {
    Promise.all([this.waitForDOMContentLoaded(), this.preloadImages(), this.simulateMinimumLoadingTime()]).then(() => {
      setTimeout(() => {
        this.isLoading = false;
        document.body.classList.remove('loading');
      }, 300);
    });
  }

  private waitForDOMContentLoaded(): Promise<void> {
    return new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', () => resolve());
      }
    });
  }

  private preloadImages(): Promise<void[]> {
    const imageUrls = [
      '../assets/images/background_img.png',
      '../assets/images/el_pollo_loco_overlay.png',
      '../assets/images/el_pollo_loco.png',
      '../assets/images/join_overlay.png',
      '../assets/images/join.png',
      '../assets/images/Property 1=Default.png',
    ];

    const imagePromises = imageUrls.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = url;
      });
    });

    return Promise.all(imagePromises);
  }

  private simulateMinimumLoadingTime(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 250);
    });
  }
}

