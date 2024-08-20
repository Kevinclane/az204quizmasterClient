import { Component, Input } from '@angular/core';
import { UploadModalComponent } from '../components/modals/upload-modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  template: `
    <div class="header">
      <div class="material-icons">home</div>
      <div class="title">{{title}}</div>
      <div>
        <div class="material-icons pointer" (click)="openUploadModal()">upload_file</div>
        <div class="material-icons">account_circle</div>
      </div>
    </div>
  `,
  selector: 'app-header',
  standalone: true,
  imports: [UploadModalComponent],
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input({ required: true }) title!: string;

  constructor(public dialog: MatDialog) { }

  openUploadModal() {
    let dialogRef = this.dialog.open(UploadModalComponent, {
      width: '40%',
      height: '40%'
    })
    console.log('Upload modal opened');
  }

}
