import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  openProfileMenu: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onShowHideMenu ():void {
    this.openProfileMenu = !this.openProfileMenu;
  }

}
