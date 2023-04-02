import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hardware, Resources } from '@core/models/resource/Resource.model';

@Component({
  selector: 'popup-search-resource',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupEditHardwareComponent implements OnInit {

  status: boolean = false;
  hasChanged: boolean = false;
  hardware: Hardware;
  constructor(
    private dialogRef: MatDialogRef<PopupEditHardwareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {hardware: Hardware},
    ) {}

  ngOnInit(): void {
  }

  receiveResource($event: Hardware) {
    this.hasChanged = true;
    this.hardware = $event;
    this.onClose();
  }

  onClose(): void {
    if (this.hasChanged)
      this.dialogRef.close(this.hardware);
    else {
      this.dialogRef.close(this.data.hardware);
    }
}
}
