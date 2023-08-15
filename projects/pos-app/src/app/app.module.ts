import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PosAuthGuard } from './core/auth/pos-guard.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NotificationsComponent } from './shared/notifications/notifications.component';
import { CounterComponent } from './components/counter/counter.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SalesComponent } from './components/sales/sales.component';
import { PosLobbyComponent } from './components/pos-lobby/pos-lobby.component';
import { PosServiceService } from './core/services/pos-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { PosInterceptorInterceptor } from './core/interceptor/pos-interceptor.interceptor';
import { PosSocketServiceService } from './core/services/pos-socket-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotificationsComponent,
    CounterComponent,
    OrdersComponent,
    SalesComponent,
    PosLobbyComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],

  providers: [
    PosServiceService,
    PosSocketServiceService,
    PosAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PosInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}