import { Component, OnInit } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';
import { User } from '@core/models/user/User.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  user: User;
  status: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<PopupComponent>
    ) {}

  ngOnInit(): void {

  }

  receiveId($event: User) {
    this.user = $event;
    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close(this.user);
}
}
