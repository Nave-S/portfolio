import { Routes } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: '', component: NavbarComponent },
];
