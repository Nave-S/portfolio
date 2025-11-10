import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectOverlayComponent } from './project-overlay/project-overlay.component';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectOverlayComponent, CommonModule, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  overlayOpen = false;
  activeProject: string | null = null;
  showPreview = true;
  isTouchDevice = false;
  touchActiveProject: string | null = null;
  projects = ['join', 'elpolloloco' /*, 'Da Bubble'*/];

  constructor(private lang: LanguageService) {
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (window.matchMedia('(min-width: 1100px) and (max-width: 1370px)').matches) {
      this.activeProject = 'join';
    }
  }
  setLang(lang: 'en' | 'de') {
    this.lang.use(lang);
  }

  get current() {
    return this.lang.current();
  }

  projectImages = {
    'join': './assets/images/join.png',
    'elpolloloco': './assets/images/el_pollo_loco.png',
    // 'Da Bubble': '/assets/images/projects/da-bubble-preview.jpg',
  };

  getActiveProjectImage(): string | null {
    if (!this.showPreview || this.overlayOpen) return null;
    return this.activeProject ? this.projectImages[this.activeProject as keyof typeof this.projectImages] ?? null : null;
  }

  openOverlay(projectName: string) {
    this.showPreview = false;
    this.activeProject = projectName;
    this.overlayOpen = true;
  }

  closeOverlay() {
    this.overlayOpen = false;
    this.showPreview = true;
    if (window.matchMedia('(min-width: 1100px) and (max-width: 1370px)').matches) {
      this.activeProject = this.activeProject;
    } else if (this.isTouchDevice && this.activeProject) {
      this.touchActiveProject = null;
    } else {
      this.activeProject = null;
    }
  }

  onProjectChange(projectName: string) {
    this.activeProject = projectName;
    this.showPreview = false;
  }

  showProjectPreview(projectName: string): void {
    if (!this.overlayOpen) {
      this.showPreview = true;
      this.activeProject = projectName;
    }
  }

  hideProjectPreview(): void {
    if (!this.overlayOpen) {
      this.showPreview = true;
      this.activeProject = null;
    }
  }

  private isPreviewVisible(): boolean {
    return window.innerWidth > 1200;
  }

  handleTouchStart(event: Event, projectName: string) {
    event.preventDefault();
    if (!this.isPreviewVisible()) {
      this.openOverlay(projectName);
      return;
    }
    if (this.touchActiveProject !== projectName) {
      this.touchActiveProject = projectName;
      this.showProjectPreview(projectName);
    } else {
      this.openOverlay(projectName);
      this.touchActiveProject = null;
    }
  }

  handleProjectClick(event: Event, projectName: string) {
    if (this.isTouchDevice) {
      return;
    }
    event.stopPropagation();
    this.openOverlay(projectName);
  }

  handlePreviewClick() {
    if (this.isTouchDevice && this.activeProject) {
      this.openOverlay(this.activeProject);
    }
  }
}

