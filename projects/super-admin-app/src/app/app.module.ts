import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/components/login/login.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ServiceService } from './core/services/service.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashbordComponent } from './shared/components/dashbord/dashbord.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartnerRegistrationComponent } from './shared/components/partner-registration/partner-registration.component';
import { authGuards } from './core/services/auth.guard';
import {
  resFullDetails,
  restaurantsDataReducer,
} from './core/store/super-admin.reducers';
import { superAdminEffects } from './core/store/super-admin.effects';
import { DetailsRestaurantsComponent } from './shared/components/details-restaurants/details-restaurants.component';
import { environment } from '../environment/environment';
import { VerifyOtpComponent } from './shared/components/verify-otp/verify-otp.component';
import { InitialRegisterPageComponent } from './shared/components/initial-register-page/initial-register-page.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { SuperAdminInterceptorInterceptor } from './core/interceptors/super-admin-interceptor.interceptor';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    DashbordComponent,
    PartnerRegistrationComponent,
    DetailsRestaurantsComponent,
    VerifyOtpComponent,
    InitialRegisterPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({
      restaurantData: restaurantsDataReducer,
      allRestaurantData: resFullDetails,
    }),
    EffectsModule.forRoot([superAdminEffects]),
    SocialLoginModule,
    GoogleSigninButtonModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    ServiceService,
    CookieService,
    authGuards,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SuperAdminInterceptorInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '373314217149-ks6armu585104gmhg10drdk1odl70s3n.apps.googleusercontent.com'
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
