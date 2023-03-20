import { Component, OnInit } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  idUser: string;
  status: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<PopupComponent>
    ) {}

  ngOnInit(): void {

  }

  receiveId($event: string) {
    this.idUser = $event;
    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close(this.idUser);
}
}
