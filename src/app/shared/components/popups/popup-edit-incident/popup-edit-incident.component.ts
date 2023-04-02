import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { incident } from '@core/models/incident/Incident.model';
import { User } from '@core/models/user/User.model';

@Component({
  selector: 'popup-search-resource',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupEditIncidentComponent implements OnInit {

  status: boolean = false;
  hasChanged: boolean = false;
  incident: incident;
  constructor(
    private dialogRef: MatDialogRef<PopupEditIncidentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {incident: incident},
    ) {}

  ngOnInit(): void {
  }

  receiveIncident($event: incident) {
    this.hasChanged = true;
    this.incident = $event;
    this.onClose();
  }

  onClose(): void {
    if (this.hasChanged)
      this.dialogRef.close(this.incident);
    else {
      this.dialogRef.close(this.data.incident);
    }
  }
}
