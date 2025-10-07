import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOverlayComponent } from './project-overlay/project-overlay.component';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectOverlayComponent, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  overlayOpen = false;
  activeProject: string | null = null;

  projectImages = {
    'Join': '/assets/images/join.png',
    'El Pollo Loco': '/assets/images/el_pollo_loco.png',
    // 'Da Bubble': '/assets/images/projects/da-bubble-preview.jpg',
  };

  openOverlay() {
    this.overlayOpen = true;
  }
  closeOverlay() {
    this.overlayOpen = false;
  }

  showProjectPreview(projectName: string): void {
    this.activeProject = projectName;
  }

  hideProjectPreview(): void {
    this.activeProject = null;
  }

  getActiveProjectImage(): string | null {
    return this.activeProject ? this.projectImages[this.activeProject as keyof typeof this.projectImages] ?? null : null;
  }
}

