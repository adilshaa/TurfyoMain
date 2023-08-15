import {
  SocialAuthService,
  SocialUser,
  GoogleSigninButtonDirective,
} from "@abacritt/angularx-social-login";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ServiceService } from "../../../core/services/service.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-initial-register-page",
  templateUrl: "./initial-register-page.component.html",
  styleUrls: ["./initial-register-page.component.css"],
})
export class InitialRegisterPageComponent {
  user!: SocialUser;
  loggedIn!: boolean;
  submitted!: boolean;
  Form!: FormGroup;
  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private http: HttpClient,
    private FormBuilder: FormBuilder,
    private AdminService: ServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      if (this.user) {
        this.initailLoginWithGoogle(user);
      }
    });
    this.Form = this.FormBuilder.group({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z]+$"),
      ]),
    });
  }

  initailLoginWithGoogle(user: any) {
    if (user) {
      console.log(user.email);
      let partnerdata = {
        email: user.email,
        name:user.name
      }
      this.router.navigate(["/partner"], {
        queryParams: { email: partnerdata.email ,usernamae:partnerdata.name},
      });
    }
    this.loggedIn = this.user != null;
  }
  InitailLogin() {
    this.submitted = true;
    if (this.Form.invalid) {
      return;
    }
    let initailData = this.Form.getRawValue();
    this.AdminService.InitailLogin(initailData).subscribe(
      (res) => {
        let id = res;
        this.router.navigate(["/partner"]);
        this.toastr.success("Account Created Successfully");
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }
}
