import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFoodsComponent } from './shared/components/foods-section/list-foods/list-foods.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { ListStocksComponent } from './shared/components/stock-section/list-stocks/list-stocks.component';
import { KitchenLoginComponent } from './shared/components/login/kitchen-login/kitchen-login.component';
import { KitchenOrdersComponent } from './shared/components/order-section/kitchen-orders/kitchen-orders.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'foods',
      },
      {
        path: 'foods',
        component: ListFoodsComponent,
      },
      {
        path: 'stocks',
        component: ListStocksComponent,
      },
      {
        path: 'orders',
        component: KitchenOrdersComponent,
      },
    ],
  },
  {
    path: 'kitchenLogin',
    component: KitchenLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
