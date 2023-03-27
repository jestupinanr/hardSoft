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
  constructor(
    private dialogRef: MatDialogRef<PopupEditHardwareComponent>,
    @Inject(MAT_DIALOG_DATA) public hardware: Hardware
    ) {
      console.log(hardware);
      this.hardware = hardware;
    }

  ngOnInit(): void {
  }

  receiveId($event: Resources) {
    this.onClose();
  }

  onClose(): void {
    console.log(this.hardware);
}
}
