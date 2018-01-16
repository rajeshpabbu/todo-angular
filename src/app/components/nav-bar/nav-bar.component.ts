import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentUser = {};

  constructor(private us: UserService) { }

  ngOnInit() {
    this.currentUser = this.us.getCurrentUser();
    console.log(this.currentUser)

  }

}
