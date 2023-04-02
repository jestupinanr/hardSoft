import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@core/models/user/User.model';

@Component({
  selector: 'popup-search-resource',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupEditPersonComponent implements OnInit {

  status: boolean = false;
  hasChanged: boolean = false;
  person: User;
  constructor(
    private dialogRef: MatDialogRef<PopupEditPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {person: User},
    ) {}

  ngOnInit(): void {
  }

  receiveUser($event: User) {
    this.hasChanged = true;
    this.person = $event;
    this.onClose();
  }

  onClose(): void {
    if (this.hasChanged)
      this.dialogRef.close(this.person);
    else {
      this.dialogRef.close(this.data.person);
    }
}
}
