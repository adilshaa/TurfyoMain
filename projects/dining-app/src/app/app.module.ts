import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiningDeskComponent } from './shared/components/dining-desk/dining-desk.component';
import { TableViewComponent } from './shared/components/table-section/table-view/table-view.component';
import { OrdersViewComponent } from './shared/components/order-section/orders-view/orders-view.component';
import { FoodViewComponent } from './shared/components/foods-section/food-view/food-view.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SidebarComponent } from './shared/components/layouts/sidebar/sidebar.component';
import { NavbarComponent } from './shared/components/layouts/navbar/navbar.component';
import { DiningServicesService } from './core/services/dining-services.service';
import { CategoryMenuComponent } from './shared/components/foods-section/category-menu/category-menu.component';
import { fooodDataReducer } from './core/store/dining.reducers';
import { FoodsData } from './core/store/dining.effects';
import { DiningLoginComponent } from './shared/components/login/dining-login/dining-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DiningInterceptorInterceptor } from './core/interceptor/dining-interceptor.interceptor';
import { CartComponent } from './shared/components/foods-section/cart/cart.component';
import { DiningNotifyComponent } from './shared/components/notifications/dining-notify/dining-notify.component';
import { diningGuardGuard } from './core/auth/gaurds/dining-guard.guard';
import { DiningSocketServiceService } from './core/services/dining-socket-service.service';

@NgModule({
  declarations: [
    NavbarComponent,
    AppComponent,
    DiningDeskComponent,
    TableViewComponent,
    OrdersViewComponent,
    FoodViewComponent,
    SidebarComponent,
    CategoryMenuComponent,
    CartComponent,
    DiningLoginComponent,
    DiningNotifyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({ foodsData: fooodDataReducer }),
    EffectsModule.forRoot([FoodsData]),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center', // Adjust the notification position as per your preference
      preventDuplicates: true,
    }),
  ],
  
  providers: [
    DiningServicesService,
    diningGuardGuard,
    DiningSocketServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DiningInterceptorInterceptor,
      multi: true,
    },
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
