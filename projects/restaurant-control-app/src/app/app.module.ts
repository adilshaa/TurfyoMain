import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { StaffsComponent } from './shared/components/staffSide/staffs/staffs.component';
import { NavbarComponent } from './shared/components/layouts/navbar/navbar.component';
import { SidebarComponent } from './shared/components/layouts/sidebar/sidebar.component';
import { LoginComponent } from './shared/components/login-staffs/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResturantControlServiceService } from './core/services/resturant-control-service.service';
import { KitchenitemsComponent } from './shared/components/kitchen-side/kitchenitems/kitchenitems.component';
import { ListFoodsComponent } from './shared/components/kitchen-side/list-foods/list-foods.component';
import { KitchenMenuComponent } from './shared/components/kitchen-side/kitchen-menu/kitchen-menu.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddstaffsComponent } from './shared/components/staffSide/addstaffs/addstaffs.component';
import { StoreModule } from '@ngrx/store';
import { staffsDetails } from './core/store/res-admin.reducer';
import { EffectsModule } from '@ngrx/effects';
import { Saffseffect } from './core/store/res-admin.effects';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewFullDetailsComponent } from './shared/components/staffSide/view-full-details/view-full-details.component';
import { ResControlLoginComponent } from './shared/components/res-control-login/res-control-login.component';
import { ToastrModule } from 'ngx-toastr';
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
  providers: [ResturantControlServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
