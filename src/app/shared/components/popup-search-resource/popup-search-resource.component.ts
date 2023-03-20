import { Component, OnInit } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'popup-search-resource',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupSearchResourceComponent implements OnInit {

  idResource: string;
  status: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<PopupSearchResourceComponent>
    ) {}

  ngOnInit(): void {

  }

  receiveId($event: string) {
    this.idResource = $event;
    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close(this.idResource);
}
}
