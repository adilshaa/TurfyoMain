import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login-staffs/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StaffsComponent } from './components/staffs-Side/staffs/staffs.component';
import { ListFoodsComponent } from './components/kitchen-side/list-foods/list-foods.component';
import { ResAuthServiceService } from './core/auth/res-auth-service.service';
import { AddstaffsComponent } from './components/staffs-Side/addstaffs/addstaffs.component';
import { ViewFullDetailsComponent } from './components/staffs-Side/view-full-details/view-full-details.component';
import { ResControlLoginComponent } from './components/res-control-login/res-control-login.component';
import { ListStockComponent } from './components/stocks-section/list-stock/list-stock.component';
import { AddStockComponent } from './components/stocks-section/add-stock/add-stock.component';
import { TableViewComponent } from './components/table-side/table-view/table-view.component';
import { EditStocksComponent } from './components/stocks-section/edit-stocks/edit-stocks.component';
import { ResAdminAuthGuard } from './core/auth/res-admin-auth-guards.guard';
const routes: Routes = [
  {
    path: 'controllersLogin',
    canActivate: [ResAdminAuthGuard],

    component: ResControlLoginComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [ResAdminAuthGuard],

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'Foods',
      },
      {
        path: 'staffs',
        component: StaffsComponent,
        canActivate: [ResAdminAuthGuard],
      },
      {
        path: 'addstaffs',
        component: AddstaffsComponent,
        canActivate: [ResAdminAuthGuard],
      },
      {
        path: 'Foods',
        component: ListFoodsComponent,
        canActivate: [ResAdminAuthGuard],
      },
      {
        path: 'editStaffs/:id',
        component: ViewFullDetailsComponent,
        canActivate: [ResAdminAuthGuard],
      },
      {
        path: 'Stocks',
        component: ListStockComponent,
        canActivate: [ResAdminAuthGuard],
      },
      {
        path: 'addStocks',
        component: AddStockComponent,
        canActivate: [ResAdminAuthGuard],
      },
      {
        path: 'editStock/:id',
        component: EditStocksComponent,
        canActivate: [ResAdminAuthGuard],
      },
      {
        path: 'tables',
        component: TableViewComponent,
        canActivate: [ResAdminAuthGuard],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    
  },

  {
    path: '**',
    redirectTo: '/controllersLogin',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
