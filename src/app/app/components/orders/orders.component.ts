import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HttpRequestService } from '../../services/http-request/http-request.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any;
  constructor(
    private router: Router, 
    private httpRequestService:HttpRequestService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    let tokenID = this.authService.getCookie('tokenID');
    let api = `https://test.greenkoncepts.com/gktest/getAllOrders?token=${tokenID}`;
    console.log(api);
    this.httpRequestService.getRequest(api).subscribe(
      (success: any) => {
          this.orders = success;
        },
        (error) => {
            console.log(error);
        }
    );
  }


  goBack() {
    this.router.navigate(['/dashboard']);
  }

}
