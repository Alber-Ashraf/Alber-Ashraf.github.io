import { Component } from '@angular/core';
import { AnimatedBackgroundComponent } from './components/animated-background/animated-background';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { CapabilitiesComponent } from './components/capabilities/capabilities';
import { TechArsenalComponent } from './components/tech-arsenal/tech-arsenal';
import { ExperienceComponent } from './components/experience/experience';
import { ProjectMatrixComponent } from './components/project-matrix/project-matrix';
import { ProjectCockpitComponent } from './components/project-cockpit/project-cockpit';
import { AcademicsComponent } from './components/academics/academics';
import { ContactComponent } from './components/contact/contact';
import { CvModalComponent } from './components/cv-modal/cv-modal';
import { ToastContainerComponent } from './components/toast-container/toast-container';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AnimatedBackgroundComponent,
    NavbarComponent,
    HeroComponent,
    CapabilitiesComponent,
    TechArsenalComponent,
    ExperienceComponent,
    ProjectMatrixComponent,
    ProjectCockpitComponent,
    AcademicsComponent,
    ContactComponent,
    CvModalComponent,
    ToastContainerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Alber Ashraf - Software Engineer | Full-Stack Systems & Enterprise Product Engineering';
}
