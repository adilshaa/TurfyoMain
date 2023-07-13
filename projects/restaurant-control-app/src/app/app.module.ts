import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StaffsComponent } from './components/staffs-Side/staffs/staffs.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { SidebarComponent } from './components/layouts/sidebar/sidebar.component';
import { LoginComponent } from './components/login-staffs/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ResturantControlServiceService } from './core/services/resturant-control-service.service';
import { KitchenitemsComponent } from './components/kitchen-side/kitchenitems/kitchenitems.component';
import { ListFoodsComponent } from './components/kitchen-side/list-foods/list-foods.component';
import { KitchenMenuComponent } from './components/kitchen-side/kitchen-menu/kitchen-menu.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddstaffsComponent } from './components/staffs-Side/addstaffs/addstaffs.component';
import { StoreModule } from '@ngrx/store';
import { staffsDetails } from './core/store/res-admin.reducer';
import { EffectsModule } from '@ngrx/effects';
import { Saffseffect } from './core/store/res-admin.effects';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewFullDetailsComponent } from './components/staffs-Side/view-full-details/view-full-details.component';
import { ResControlLoginComponent } from './components/res-control-login/res-control-login.component';
import { ToastrModule } from 'ngx-toastr';
import { ResAdminAuthGuard } from './core/auth/res-admin-auth-guards.guard';
import { ResAdminInterseptorInterceptor } from './core/interceptors/res-admin-interseptor.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StaffsComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    AddstaffsComponent,
    KitchenitemsComponent,
    ListFoodsComponent,
    KitchenMenuComponent,
    ViewFullDetailsComponent,
    ResControlLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    StoreModule.forRoot({ staffsData: staffsDetails }),
    EffectsModule.forRoot([Saffseffect]),
    ToastrModule.forRoot(),
  ],
  providers: [
    ResturantControlServiceService,
    ResAdminAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResAdminInterseptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
