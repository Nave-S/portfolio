import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NavbarComponent, AboutComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {}
