import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApiService } from "../../services/api.service";

@Component({
    template: `
        <div class="container">
            <h3>Select JSON file to upload</h3>
            <input type="file" name="file" id="file" (change)="setFile($event)">
            <button class="button-primary" (click)="upload()">Upload</button>
        </div>
    `,
    selector: 'app-upload-modal',
    standalone: true,
    styleUrl: './upload-modal.component.scss'
})

export class UploadModalComponent {

    apiBody: string = '';

    constructor(
        public dialogRef: MatDialogRef<UploadModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _apiService: ApiService
    ) { }

    setFile(event: any) {
        event.target.files[0].text()
            .then((text: string) => {
                this.apiBody = JSON.parse(text);
            });

        console.log(event);
        console.log('File selected');
    }

    upload() {
        if (this.apiBody !== '') {
            this._apiService.post('/JsonIntake', this.apiBody).subscribe((response) => {
                console.log('File uploaded:', response);
                this.dialogRef.close();
            });
        }
    }

}