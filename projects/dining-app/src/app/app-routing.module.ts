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

const routes: Routes = [
  {
    path: '',
    component: DiningDeskComponent,
    children: [
      { path: 'viewFoods', component: FoodViewComponent },
      { path: 'tables', component: TableViewComponent },
      { path: 'orders', component: OrdersViewComponent },
    ],
  },
  {
    path: 'diningLogin',
    component: DiningLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
