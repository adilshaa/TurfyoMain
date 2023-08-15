import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { ListFoodsComponent } from './shared/components/foods-section/list-foods/list-foods.component';
import { NavbarComponent } from './shared/layouts/navbar/navbar.component';
import { SidebarComponent } from './shared/layouts/sidebar/sidebar.component';
import { foodDetails } from './core/store/kitchen-reducer';
import { Foodseffect } from './core/store/kitchen.effects';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { KitchenLoginComponent } from './shared/components/login/kitchen-login/kitchen-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KitchenInterceptorInterceptor } from './core/auth/interceptor/kitchen-interceptor.interceptor';
import { KitchenServiceService } from './core/services/kitchen-service.service';
import { ToastrModule } from 'ngx-toastr';
import { KitchenOrdersComponent } from './shared/components/order-section/kitchen-orders/kitchen-orders.component';
import { KitchenNotifyComponent } from './shared/notificatinos/kitchen-notify/kitchen-notify.component';
import { SocketKitchenServiceService } from './core/services/socket-kitchen-service.service';

@NgModule({
  declarations: [
    AppComponent,
    ListFoodsComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    KitchenLoginComponent,
    KitchenOrdersComponent,
    KitchenNotifyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center', // Adjust the notification position as per your preference
      preventDuplicates: true,
    }),
    StoreModule.forRoot({ foodsData: foodDetails }),
    EffectsModule.forRoot([Foodseffect]),
  ],
  providers: [
    KitchenServiceService,
    KitchenNotifyComponent,
    SocketKitchenServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KitchenInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
