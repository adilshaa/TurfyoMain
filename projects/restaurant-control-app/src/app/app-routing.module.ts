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
    path: '**',
    redirectTo: '/controllersLogin',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
