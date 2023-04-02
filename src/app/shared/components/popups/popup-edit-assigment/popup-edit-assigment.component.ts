import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Assigment } from '@core/models/assigment/Assigments.model';
import { incident } from '@core/models/incident/Incident.model';
import { User } from '@core/models/user/User.model';

@Component({
  selector: 'popup-search-resource',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupEditAssigmentComponent implements OnInit {

  status: boolean = false;
  hasChanged: boolean = false;
  assigment: Assigment;
  constructor(
    private dialogRef: MatDialogRef<PopupEditAssigmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {assigment: Assigment},
    ) {}

  ngOnInit(): void {
  }

  receiveAssigment($event: Assigment) {
    this.hasChanged = true;
    this.assigment = $event;
    this.onClose();
  }

  onClose(): void {
    if (this.hasChanged)
      this.dialogRef.close(this.assigment);
    else {
      this.dialogRef.close(this.data.assigment);
    }
  }
}
