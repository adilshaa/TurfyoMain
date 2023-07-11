import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login-staffs/login.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { StaffsComponent } from './shared/components/staffSide/staffs/staffs.component';
import { ListFoodsComponent } from './shared/components/kitchen-side/list-foods/list-foods.component';
import { ResAuthServiceService } from './core/services/res-auth-service.service';
import { AddstaffsComponent } from './shared/components/staffSide/addstaffs/addstaffs.component';
import { ViewFullDetailsComponent } from './shared/components/staffSide/view-full-details/view-full-details.component';
import { ResControlLoginComponent } from './shared/components/res-control-login/res-control-login.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // canActivate: [ResAuthServiceService ],
    children: [
      {
        path: 'staffs',
        component: StaffsComponent,
      },
      {
        path: 'addstaffs',
        component: AddstaffsComponent,
      },
      {
        path: 'listFoods',
        component: ListFoodsComponent,
      },
      {
        path: 'editStaffs/:id',
        component: ViewFullDetailsComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'controllersLogin',
    component: ResControlLoginComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
