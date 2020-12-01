import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  AuthGuard
} from './app/guards/auth.guard';


const routes: Routes = [{
    path: 'login',
    loadChildren: () => import('./app/modules/login/login.module').then(m => m.LoginModule)
  }, {
    path: 'dashboard',
    loadChildren: () => import('./app/modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  }, {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
