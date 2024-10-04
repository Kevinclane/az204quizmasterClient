import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";

@Component({
  template: `
    <app-header></app-header>
    <router-outlet />
  `,
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'az204quizmasterClient';
}
