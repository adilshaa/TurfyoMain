import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./shared/components/login/login.component";
import { DashbordComponent } from "./shared/components/dashbord/dashbord.component";
import { PartnerRegistrationComponent } from "./shared/components/partner-registration/partner-registration.component";
import { AuthGuard } from "./core/auth/auth.guard";
import { DetailsRestaurantsComponent } from "./shared/components/details-restaurants/details-restaurants.component";
import { InitialRegisterPageComponent } from "./shared/components/initial-register-page/initial-register-page.component";
import { VerifyOtpComponent } from "./shared/components/verify-otp/verify-otp.component";

const routes: Routes = [
  {
    path: "",
    component: DashbordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    component: LoginComponent,
  },

  {
    path: "partner/:id",
    component: PartnerRegistrationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "full_details/:id",
    component: DetailsRestaurantsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "initaillogin",
    component: InitialRegisterPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "**",
    redirectTo: "/login",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
