import { Component, OnInit } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';
import { Assigment } from '@core/models/assigment/Assigments.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupSearchAssigmentComponent implements OnInit {

  assigment: Assigment;
  status: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<PopupSearchAssigmentComponent>
    ) {}

  ngOnInit(): void {

  }

  receiveId($event: Assigment) {
    this.assigment = $event;
    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close(this.assigment);
  }
}
