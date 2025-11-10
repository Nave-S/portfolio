import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';

interface ProjectData {
  number: string;
  titleKey: string;
  infoTitleKey: string;
  descriptionKey: string;
  tech: { nameKey: string; icon: string; altKey?: string }[];
  buttons: { labelKey: string; icon: string; link: string }[];
  previewImage: string;
}

@Component({
  selector: 'app-project-overlay',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './project-overlay.component.html',
  styleUrl: './project-overlay.component.scss',
})
export class ProjectOverlayComponent {
  @Input() projectName: string = '';
  @Input() closeOnBackdrop = true;
  @Output() closed = new EventEmitter<void>();
  @Output() projectChange = new EventEmitter<string>();
  open = true;

  private originalBodyStyle: string = '';
  private touchStartX = 0;
  private touchEndX = 0;
  private prevScrollBehavior = '';

  constructor(private lang: LanguageService) {}
  setLang(lang: 'en' | 'de') {
    this.lang.use(lang);
  }

  get current() {
    return this.lang.current();
  }

  private projectOrder = ['join', 'elpolloloco'];

  nextProject() {
    const current = this.projectName;
    const idx = this.projectOrder.indexOf(current);
    const next = this.projectOrder[(idx + 1) % this.projectOrder.length];
    this.projectName = next;
    this.projectChange.emit(next);
    const previewElement = document.querySelector('.projects-preview img') as HTMLImageElement;
    if (previewElement) {
      previewElement.style.display = 'none';
    }
  }

  get activeProject(): ProjectData {
    const project = this.getProjectData();
    if (!project) {
      return this.getDefaultProject();
    }
    return project;
  }

  private getProjectData(): ProjectData | null {
    switch (this.projectName.toLowerCase()) {
      case 'join':
        return {
          number: '01',
          titleKey: 'PROJECTS.OVERLAY.JOIN.TITLE',
          infoTitleKey: 'PROJECTS.OVERLAY.INFO_TITLE',
          descriptionKey: 'PROJECTS.OVERLAY.JOIN.DESCRIPTION',
          tech: [
            {
              nameKey: 'PROJECTS.OVERLAY.JOIN.TECH.HTML',
              icon: './assets/icons/html_green.png',
              altKey: 'PROJECTS.OVERLAY.JOIN.TECH.HTML',
            },
            {
              nameKey: 'PROJECTS.OVERLAY.JOIN.TECH.CSS',
              icon: './assets/icons/css_green.png',
              altKey: 'PROJECTS.OVERLAY.JOIN.TECH.CSS',
            },
            {
              nameKey: 'PROJECTS.OVERLAY.JOIN.TECH.JAVASCRIPT',
              icon: './assets/icons/javascript_green.png',
              altKey: 'PROJECTS.OVERLAY.JOIN.TECH.JAVASCRIPT',
            },
            {
              nameKey: 'PROJECTS.OVERLAY.JOIN.TECH.FIREBASE',
              icon: './assets/icons/firebase_green.png',
              altKey: 'PROJECTS.OVERLAY.JOIN.TECH.FIREBASE',
            },
          ],
          buttons: [
            {
              labelKey: 'PROJECTS.BUTTONS.GITHUB',
              icon: './assets/icons/arrow_green.png',
              link: 'https://github.com/Nave-S/Join',
            },
            {
              labelKey: 'PROJECTS.BUTTONS.LIVE',
              icon: './assets/icons/arrow_green.png',
              link: 'https://www.nawiedsyed.de/Join',
            },
          ],
          previewImage: './assets/images/join_overlay.png',
        };

      case 'elpolloloco':
        return {
          number: '02',
          titleKey: 'PROJECTS.OVERLAY.ELPOLLOLOCO.TITLE',
          infoTitleKey: 'PROJECTS.OVERLAY.INFO_TITLE',
          descriptionKey: 'PROJECTS.OVERLAY.ELPOLLOLOCO.DESCRIPTION',
          tech: [
            {
              nameKey: 'PROJECTS.OVERLAY.ELPOLLOLOCO.TECH.HTML',
              icon: './assets/icons/html_green.png',
              altKey: 'PROJECTS.OVERLAY.ELPOLLOLOCO.TECH.HTML',
            },
            {
              nameKey: 'PROJECTS.OVERLAY.ELPOLLOLOCO.TECH.CSS',
              icon: './assets/icons/css_green.png',
              altKey: 'PROJECTS.OVERLAY.ELPOLLOLOCO.TECH.CSS',
            },
            {
              nameKey: 'PROJECTS.OVERLAY.ELPOLLOLOCO.TECH.JAVASCRIPT',
              icon: './assets/icons/javascript_green.png',
              altKey: 'PROJECTS.OVERLAY.ELPOLLOLOCO.TECH.JAVASCRIPT',
            },
          ],
          buttons: [
            {
              labelKey: 'PROJECTS.BUTTONS.GITHUB',
              icon: './assets/icons/arrow_green.png',
              link: 'https://github.com/Nave-S/El-Pollo-Loco',
            },
            {
              labelKey: 'PROJECTS.OVERLAY.ELPOLLOLOCO.BUTTONS.LIVE',
              icon: './assets/icons/arrow_green.png',
              link: 'https://www.nawiedsyed.de/El-Pollo-Loco',
            },
          ],
          previewImage: './assets/images/el_pollo_loco_overlay.png',
        };

      default:
        return null;
    }
  }

  private getDefaultProject(): ProjectData {
    return {
      number: '00',
      titleKey: 'PROJECTS.OVERLAY.DEFAULT.TITLE',
      infoTitleKey: 'PROJECTS.OVERLAY.DEFAULT.INFO_TITLE',
      descriptionKey: 'PROJECTS.OVERLAY.DEFAULT.DESCRIPTION',
      tech: [],
      buttons: [],
      previewImage: './assets/images/placeholder.png',
    };
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  private handleSwipe() {
    const swipeThreshold = 100;
    const swipeDistance = this.touchEndX - this.touchStartX;

    if (swipeDistance < -swipeThreshold) {
      this.nextProject();
    }
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open) {
      this.open = false;
      this.enableScroll();
      this.closed.emit();
    }
  }

  onBackdropClick() {
    if (this.closeOnBackdrop) {
      this.open = false;
      this.enableScroll();
      this.closed.emit();
    }
  }

  close() {
    this.open = false;
    this.enableScroll();
    this.closed.emit();
  }

  ngOnInit(): void {
    this.disableSmoothScrolling();
    this.disableScroll();
    this.initializeOverlayScroll();
  }

  private disableSmoothScrolling(): void {
    const html = document.documentElement;
    this.prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
  }

  private initializeOverlayScroll(): void {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.applyInitialScroll();
        this.restoreSmoothScrolling();
      });
    });
  }

  private applyInitialScroll(): void {
    const overlayElement = this.getOverlayElement();
    if (!overlayElement) return;

    if (this.shouldScrollToPreview()) {
      this.scrollToPreviewPanel(overlayElement);
    } else {
      this.scrollToTop(overlayElement);
    }
  }

  private getOverlayElement(): HTMLElement | null {
    return document.querySelector('.overlay-main-content') as HTMLElement | null;
  }

  private shouldScrollToPreview(): boolean {
    return window.innerWidth <= 1320;
  }

  private scrollToPreviewPanel(overlayElement: HTMLElement): void {
    const panelRight = document.querySelector('.panel-right') as HTMLElement | null;
    if (panelRight) {
      overlayElement.scrollTop = panelRight.offsetTop;
    }
  }

  private scrollToTop(overlayElement: HTMLElement): void {
    overlayElement.scrollTop = 0;
  }

  private restoreSmoothScrolling(): void {
    setTimeout(() => {
      const html = document.documentElement;
      html.style.scrollBehavior = this.prevScrollBehavior || '';
    }, 0);
  }

  ngOnDestroy(): void {
    this.enableScroll();
  }

  private disableScroll(): void {
    this.originalBodyStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  private enableScroll(): void {
    document.body.style.overflow = this.originalBodyStyle;
  }
}

