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
  projects = ['join', 'elpolloloco' /*, 'Da Bubble'*/];

  constructor(private lang: LanguageService) {}
  setLang(lang: 'en' | 'de') {
    this.lang.use(lang);
  }

  get current() {
    return this.lang.current();
  }

  projectImages = {
    'join': '/assets/images/join.png',
    'elpolloloco': '/assets/images/el_pollo_loco.png',
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
    this.showPreview = false;
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
}

