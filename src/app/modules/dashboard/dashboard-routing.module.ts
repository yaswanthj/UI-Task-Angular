import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from '../../components/customer/customer.component';
import { HierarchyComponent } from '../../components/hierarchy/hierarchy.component';
import { OrdersComponent } from '../../components/orders/orders.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';


const routes: Routes = [{
  path: '',
  component: DashboardViewComponent
},{
  path: 'order',
  component: OrdersComponent
},{
  path: 'customer',
  component: CustomerComponent
},{
  path: 'hierarchy',
  component: HierarchyComponent
},
{
  path: '**',
  component: CustomerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
