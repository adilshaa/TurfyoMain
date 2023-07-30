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
import { authGuards } from 'projects/super-admin-app/src/app/core/services/auth.guard';
import { ListStockComponent } from './components/stocks-section/list-stock/list-stock.component';
import { AddStockComponent } from './components/stocks-section/add-stock/add-stock.component';
import { TableViewComponent } from './components/table-side/table-view/table-view.component';
import { EditStocksComponent } from './components/stocks-section/edit-stocks/edit-stocks.component';
const routes: Routes = [
  {
    path: 'controllersLogin',
    component: ResControlLoginComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'Foods',
      },
      {
        path: 'staffs',
        component: StaffsComponent,
      },
      {
        path: 'addstaffs',
        component: AddstaffsComponent,
      },
      {
        path: 'Foods',
        component: ListFoodsComponent,
      },
      {
        path: 'editStaffs/:id',
        component: ViewFullDetailsComponent,
      },
      {
        path: 'Stocks',
        component: ListStockComponent,
      },
      {
        path: 'addStocks',
        component: AddStockComponent,
      },
      {
        path: 'editStock/:id',
        component: EditStocksComponent,
      },
      {
        path: 'tables',
        component: TableViewComponent,
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
