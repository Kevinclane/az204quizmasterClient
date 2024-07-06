import { Component, Input } from '@angular/core';

@Component({
  template: `
    <div class="header">
      <div class="material-icons">home</div>
      <div class="title">{{title}}</div>
      <div class="material-icons">account_circle</div>
    </div>
  `,
  selector: 'app-header',
  standalone: true,
  imports: [],
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input({ required: true }) title!: string;
}
