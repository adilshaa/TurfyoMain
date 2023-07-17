import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { ListFoodsComponent } from './shared/components/foods-section/list-foods/list-foods.component';
import { ListStocksComponent } from './shared/components/stock-section/list-stocks/list-stocks.component';
import { NavbarComponent } from './shared/components/layouts/navbar/navbar.component';
import { SidebarComponent } from './shared/components/layouts/sidebar/sidebar.component';
import { foodDetails } from './core/store/kitchen-reducer';
import { Foodseffect } from './core/store/kitchen.effects';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { KitchenLoginComponent } from './shared/components/login/kitchen-login/kitchen-login.component';

@NgModule({
  declarations: [
    AppComponent,
    ListFoodsComponent,
    ListStocksComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    KitchenLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ foodsData: foodDetails }),
    EffectsModule.forRoot([Foodseffect]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
