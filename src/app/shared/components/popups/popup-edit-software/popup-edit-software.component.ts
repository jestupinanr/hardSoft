import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Resources, Software } from '@core/models/resource/Resource.model';

@Component({
  selector: 'popup-search-resource',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupEditSoftwareComponent implements OnInit {

  status: boolean = false;
  hasChanged: boolean = false;
  software: Software;
  constructor(
    private dialogRef: MatDialogRef<PopupEditSoftwareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {software: Software},
    ) {}

  ngOnInit(): void {
  }

  receiveResource($event: Software) {
    this.hasChanged = true;
    this.software = $event;
    this.onClose();
  }

  onClose(): void {
    if (this.hasChanged)
      this.dialogRef.close(this.software);
    else {
      this.dialogRef.close(this.data.software);
    }
}
}
