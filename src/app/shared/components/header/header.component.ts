import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedServiceService } from 'src/app/shared-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  openProfileMenu: boolean = false;
  @Output() sidebarStatus = new EventEmitter<boolean>();
  constructor(private cookieService: CookieService,
    private router: Router,
    ) { }

  public userName = this.cookieService.get('userName')
  public roleName = this.cookieService.get('roleName');
  ngOnInit(): void {
  }

  onShowHideMenu ():void {
    this.openProfileMenu = !this.openProfileMenu;
  }

  showSidebar(): void {
    this.sidebarStatus.emit(true);
  }

  logOut():void {
    this.cookieService.delete('token', '/');
    this.router.navigate(['/auth/login']);
  }

}
