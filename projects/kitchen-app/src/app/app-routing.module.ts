import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFoodsComponent } from './shared/components/foods-section/list-foods/list-foods.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { ListStocksComponent } from './shared/components/stock-section/list-stocks/list-stocks.component';
import { KitchenLoginComponent } from './shared/components/login/kitchen-login/kitchen-login.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'kitchenLogin',
    component: KitchenLoginComponent,
  },
  {
    path: 'foods',
    component: ListFoodsComponent,
  },
  {
    path: 'stocks',
    component: ListStocksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
