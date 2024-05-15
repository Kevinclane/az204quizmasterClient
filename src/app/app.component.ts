import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';

@Component({
  template: `
    <router-outlet />
  `,
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomepageComponent],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'az204quizmasterClient';
}
