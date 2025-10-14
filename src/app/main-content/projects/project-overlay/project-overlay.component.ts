import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProjectData {
  number: string;
  title: string;
  infoTitle: string;
  description: string;
  tech: { name: string; icon: string; alt: string }[];
  buttons: { label: string; icon: string; link: string }[];
  previewImage: string;
}

@Component({
  selector: 'app-project-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-overlay.component.html',
  styleUrl: './project-overlay.component.scss',
})
export class ProjectOverlayComponent {
  @Input() projectName: string = '';
  @Input() closeOnBackdrop = true;
  @Output() closed = new EventEmitter<void>();
  @Output() projectChange = new EventEmitter<string>();
  open = true;

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
          title: 'Join',
          infoTitle: 'What is this project about',
          description:
            'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
          tech: [
            { name: 'HTML', icon: 'assets/icons/html_green.png', alt: 'HTML' },
            { name: 'CSS', icon: 'assets/icons/css_green.png', alt: 'CSS' },
            { name: 'JavaScript', icon: 'assets/icons/javascript_green.png', alt: 'JavaScript' },
            { name: 'Firebase', icon: 'assets/icons/firebase_green.png', alt: 'Firebase' },
          ],
          buttons: [
            { label: 'GitHub', icon: 'assets/icons/arrow_green.png', link: 'https://github.com/your-repo' },
            { label: 'Live Test', icon: 'assets/icons/arrow_green.png', link: 'https://your-live-site' },
          ],
          previewImage: 'assets/images/join_placeholder.png',
        };

      case 'elpolloloco':
        return {
          number: '02',
          title: 'El Pollo Loco',
          infoTitle: 'What is this project about',
          description:
            'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
          tech: [
            { name: 'HTML', icon: 'assets/icons/html_green.png', alt: 'HTML' },
            { name: 'CSS', icon: 'assets/icons/css_green.png', alt: 'CSS' },
            { name: 'JavaScript', icon: 'assets/icons/javascript_green.png', alt: 'JavaScript' },
          ],
          buttons: [
            { label: 'GitHub', icon: 'assets/icons/arrow_green.png', link: 'https://github.com/your-repo' },
            { label: 'Live Test', icon: 'assets/icons/arrow_green.png', link: 'https://your-live-site' },
          ],
          previewImage: 'assets/images/el_pollo_loco_placeholder.png',
        };

      default:
        return null;
    }
  }

  private getDefaultProject(): ProjectData {
    return {
      number: '00',
      title: 'Project Not Found',
      infoTitle: 'Error',
      description: 'Project details not available',
      tech: [],
      buttons: [],
      previewImage: 'assets/images/placeholder.png',
    };
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open) {
      this.open = false;
      this.closed.emit();
    }
  }

  onBackdropClick() {
    if (this.closeOnBackdrop) {
      this.open = false;
      this.closed.emit();
    }
  }

  close() {
    this.open = false;
    this.closed.emit();
  }
}

