import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { NavbarComponent } from './components/hero/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: '', component: NavbarComponent },
  { path: '', component: AboutComponent },
];

