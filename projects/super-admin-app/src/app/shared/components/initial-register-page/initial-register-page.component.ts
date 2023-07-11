import {
  SocialAuthService,
  SocialUser,
  GoogleSigninButtonDirective,
} from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../../core/services/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-initial-register-page',
  templateUrl: './initial-register-page.component.html',
  styleUrls: ['./initial-register-page.component.css'],
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
    this.Form = this.FormBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.http
          .post('http://localhost:5000/restaurants/initialLogin', user, {
            withCredentials: true,
          })
          .subscribe(
            (result: any) => {
              console.log(result);
              let id = result.resId;
              this.router.navigate(['/partner',id]);
            },
            
            (err) => {
      this.toastr.error(err.error.message);

            }
          );
      }
      console.log(this.user);
      this.loggedIn = user != null;
    });
  }

  InitailLogin() {
    this.submitted = true;
    if (this.Form.invalid) {
      return;
    }
    let initailData = this.Form.getRawValue();
    this.AdminService.InitailLogin(initailData).subscribe((res) => {
      this.router.navigate(['/partner']);
      this.toastr.success("Account Created Successfully")
    }, (err) => {
      this.toastr.error(err.error.message)
    });
  }
}
