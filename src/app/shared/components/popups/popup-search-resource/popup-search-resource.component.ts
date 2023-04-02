import { Component, OnInit } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';
import { Resources } from '@core/models/resource/Resource.model';

@Component({
  selector: 'popup-search-resource',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupSearchResourceComponent implements OnInit {

  resource: Resources;
  status: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<PopupSearchResourceComponent>
    ) {}

  ngOnInit(): void {

  }

  receiveId($event: Resources) {
    this.resource = $event;
    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close(this.resource);
}
}
