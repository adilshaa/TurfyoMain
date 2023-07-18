import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { KitchenInterceptorInterceptor } from './core/auth/interceptor/kitchen-interceptor.interceptor';
import { KitchenServiceService } from './core/services/kitchen-service.service';

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
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastModule,
    StoreModule.forRoot({ foodsData: foodDetails }),
    EffectsModule.forRoot([Foodseffect]),
  ],
  providers: [
    KitchenServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KitchenInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
