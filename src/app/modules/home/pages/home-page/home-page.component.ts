import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  statusSideBar: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  getStatusSideBar(status: boolean): void {
    this.statusSideBar = status;
  }

}
