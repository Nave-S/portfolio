import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event as RouterEvent } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  isLoading = true;

  private prevScrollBehavior = '';

  constructor(private router: Router) {
    this.setupScrollBehaviorOnNavigation();
  }

  private setupScrollBehaviorOnNavigation(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.disableSmoothScrolling();
        this.setManualScrollRestoration();
      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.restoreScrollBehavior();
      }
    });
  }

  private disableSmoothScrolling(): void {
    const html = document.documentElement;
    const body = document.body;

    this.prevScrollBehavior = html.style.scrollBehavior || body.style.scrollBehavior || '';
    html.style.scrollBehavior = 'auto';
    body.style.scrollBehavior = 'auto';
  }

  private setManualScrollRestoration(): void {
    try {
      if ('scrollRestoration' in history) {
        (history as any).scrollRestoration = 'manual';
      }
    } catch (e) {}
  }

  private restoreScrollBehavior(): void {
    setTimeout(() => {
      const html = document.documentElement;
      const body = document.body;
      html.style.scrollBehavior = this.prevScrollBehavior || '';
      body.style.scrollBehavior = this.prevScrollBehavior || '';

      this.restoreAutoScrollRestoration();
    }, 0);
  }

  private restoreAutoScrollRestoration(): void {
    try {
      if ('scrollRestoration' in history) {
        (history as any).scrollRestoration = 'auto';
      }
    } catch (e) {}
  }

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

