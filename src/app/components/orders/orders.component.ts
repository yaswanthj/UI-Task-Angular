import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Orders } from 'src/app/interfaces/orders';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Orders;
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
    let api = `${environment.server}/getAllOrders?token=${tokenID}`;
    this.httpRequestService.getRequest(api).subscribe(
      (success: any) => {
          this.orders = success;
        },
        (error) => {
            console.error(error);
        }
    );
  }


  goBack() {
    this.router.navigate(['/dashboard']);
  }

}
