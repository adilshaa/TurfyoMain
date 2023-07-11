import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFoodsComponent } from './shared/components/foods-section/list-foods/list-foods.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { ListStocksComponent } from './shared/components/stock-section/list-stocks/list-stocks.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'foods',
    component: ListFoodsComponent,
  },
  {
    path: 'stocks',
    component:ListStocksComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
