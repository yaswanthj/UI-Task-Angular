import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  DashboardRoutingModule
} from './dashboard-routing.module';
import {
  DashboardViewComponent
} from './dashboard-view/dashboard-view.component';
import {
  OrdersComponent
} from '../../components/orders/orders.component';
import {
  CustomerComponent
} from '../../components/customer/customer.component';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { HierarchyComponent } from '../../components/hierarchy/hierarchy.component';


@NgModule({
  declarations: [
    DashboardViewComponent,
    OrdersComponent,
    CustomerComponent,
    HierarchyComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DashboardModule {}
