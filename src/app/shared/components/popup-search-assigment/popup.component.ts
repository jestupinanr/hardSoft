import { Component, OnInit } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupSearchAssigmentComponent implements OnInit {

  idAssigment: string;
  status: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<PopupSearchAssigmentComponent>
    ) {}

  ngOnInit(): void {

  }

  receiveId($event: string) {
    this.idAssigment = $event;
    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close(this.idAssigment);
}
}
