import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {
  userName = sessionStorage.getItem('userName');

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
  
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  goTo(url) {
    this.router.navigate([url]);
  }

  logout(){
    this.authService.logout((status) => {
      if(status){
        this.router.navigate(['/login']);
      }
    });
  }

}
