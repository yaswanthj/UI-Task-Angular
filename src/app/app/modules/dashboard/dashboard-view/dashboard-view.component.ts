import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {
  user = {
    firstName: "GK",
    lastName: "UI Test",
    userName: "gkuitest",
    key: 'sdsd'
  }

  pageElements = [{
    name: 'Heirarchy',
    url: './hierarchy'
  }, {
    name: 'Customers',
    url: './customer'
  }, {
    name: 'Order',
    url: './order'
  }, {
    name: 'Schedules',
    url: './schedules'
  }, {
    name: 'Messages',
    url: './messages'
  }, {
    name: 'Email',
    url: './email'
  }]
  
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goTo(url) {
    this.router.navigate([url]);
  }

  logout(){
    console.log('logout');
  }

}
