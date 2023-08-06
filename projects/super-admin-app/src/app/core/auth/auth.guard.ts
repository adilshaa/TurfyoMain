import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    try {
      const response = localStorage.getItem("isLoggedIN");

      if (response) {
        console.log(true);
        return true; //authentication success
      } else {
        this.router.navigate(["/login"]);
        return false; //authentication failed
      }
    } catch (error) {
      console.error("An error occurred during authentication:", error); //authentication error hand/ing
      this.router.navigate(["/"]);
      return false;
    }
  }
}
