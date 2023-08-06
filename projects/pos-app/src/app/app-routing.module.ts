import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosLobbyComponent } from './components/pos-lobby/pos-lobby.component';
import { CounterComponent } from './components/counter/counter.component';
import { SalesComponent } from './components/sales/sales.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PosAuthGuard } from './core/auth/pos-guard.guard';
const routes: Routes = [
  {
    path: '',
    component: PosLobbyComponent,
    canActivate: [PosAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'counter',
      },
      {
        path: 'counter',
        component: CounterComponent,
        canActivate: [PosAuthGuard],
      },
      {
        path: 'sales',
        component: SalesComponent,
        canActivate: [PosAuthGuard],
      },
      {
        path: 'order',
        component: OrdersComponent,
        canActivate: [PosAuthGuard],
      },
    ],
  },
  {
    path: 'poslogin',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
