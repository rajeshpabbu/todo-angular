import { Component, OnInit } from '@angular/core';
import { UserService, AuthenticationService } from '../../services/index';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentUser;

  constructor(
    private us: UserService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    const lsUser = localStorage.getItem('currentUser');
    if (lsUser) {
      this.us.updateCurrentUer(JSON.parse(lsUser));
    }
    this.currentUser = this.us.getCurrentUser();
  }

  logout() {
    this.authenticationService.logout();
  }

}
