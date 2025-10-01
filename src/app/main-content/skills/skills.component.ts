import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  skills = [
    { label: 'HTML', icon: 'html.png' },
    { label: 'CSS', icon: 'css.png' },
    { label: 'JavaScript', icon: 'javascript.png' },
    { label: 'Material', icon: 'material_design.png' },
    { label: 'TypeScript', icon: 'typescript.png' },
    { label: 'Angular', icon: 'angular.png' },
    { label: 'Firebase', icon: 'firebase.png' },
    { label: 'Git', icon: 'git.png' },
    { label: 'REST-API', icon: 'rest_api.png' },
    { label: 'Scrum', icon: 'scrum.png' },
    { label: 'Growth mindset', icon: 'growth_mindset.png' },
  ];
}

