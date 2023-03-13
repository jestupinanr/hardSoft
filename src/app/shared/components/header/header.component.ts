import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  openProfileMenu: boolean = false;
  constructor(private cookieService: CookieService, private router: Router) { }

  public userName = this.cookieService.get('userName')
  public roleName = this.cookieService.get('roleName');
  ngOnInit(): void {
  }

  onShowHideMenu ():void {
    this.openProfileMenu = !this.openProfileMenu;
  }

  logOut():void {
    this.cookieService.delete('token', '/');
    this.router.navigate(['/auth/login']);
  }

}
