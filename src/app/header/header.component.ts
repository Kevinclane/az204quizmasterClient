import { Component } from '@angular/core';
import { UploadModalComponent } from '../components/modals/upload-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { HeaderStateService } from '../services/states/headerstate.service';
import { Router } from '@angular/router';


@Component({
  template: `
    <div class="header">
      <div class="material-icons pointer" (click)="navigateHome()">home</div>
      <div class="title">{{title}}</div>
      <div>
        <div class="material-icons pointer" (click)="openUploadModal()">upload_file</div>
      </div>
    </div>
  `,
  selector: 'app-header',
  standalone: true,
  imports: [UploadModalComponent],
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title: string = '';

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
    this.dialog.open(UploadModalComponent, {
      width: '40%',
      height: '40%'
    });
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

}
