import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './shared/components/layouts/navbar/navbar.component';
import { SidebarComponent } from './shared/components/layouts/sidebar/sidebar.component';
import { DiningDeskComponent } from './shared/components/dining-desk/dining-desk.component';
import { FoodViewComponent } from './shared/components/foods-section/food-view/food-view.component';
import { DiningLoginComponent } from './shared/components/login/dining-login/dining-login.component';
import { TableViewComponent } from './shared/components/table-section/table-view/table-view.component';
import { CartComponent } from './shared/components/foods-section/cart/cart.component';
import { OrdersViewComponent } from './shared/components/order-section/orders-view/orders-view.component';
import { diningGuardGuard } from './core/auth/gaurds/dining-guard.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [diningGuardGuard],

    component: DiningDeskComponent,

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'viewFoods',
      },
      { path: 'viewFoods', component: FoodViewComponent },
      { path: 'tables', component: TableViewComponent },
      { path: 'orders', component: OrdersViewComponent },
    ],
  },
  {
    path: 'diningLogin',
    component: DiningLoginComponent,
    canActivate: [diningGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
