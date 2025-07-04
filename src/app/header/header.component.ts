import { Component } from '@angular/core';
import { UploadModalComponent } from '../components/modals/upload-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { HeaderStateService } from '../services/states/headerstate.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';


@Component({
  template: `
    <div class="header">
      <div class="material-icons pointer" (click)="navigateHome()" id="home">home</div>
      <div class="title">{{title}}</div>
      <div *ngIf="isDevMode">
        <div class="material-icons pointer" (click)="openUploadModal()" id="upload-file">upload_file</div>
      </div>
    </div>
  `,
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title: string = '';
  isDevMode: boolean = !environment.production;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private _headerStateService: HeaderStateService
  ) {
    this._headerStateService.getTitle().subscribe((title) => {
      this.title = title;
    });
  }

  openUploadModal() {

    //!TODO Need to gate this behind development mode only

    this.dialog.open(UploadModalComponent, {
      width: '40%',
      height: '40%'
    });
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

}
