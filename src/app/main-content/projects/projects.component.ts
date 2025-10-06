import { Component } from '@angular/core';
import { ProjectOverlayComponent } from './project-overlay/project-overlay.component';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectOverlayComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {}

