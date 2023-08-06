import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  SocialAuthService,
  SocialUser,
  GoogleSigninButtonDirective,
} from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { ResturantControlServiceService } from '../../core/services/resturant-control-service.service';
import { ToastrService } from 'ngx-toastr';
import { RestaurantControlEmitter } from '../../shared/emmiter/res-control-emmitter';

@Component({
  selector: 'app-res-control-login',
  templateUrl: './res-control-login.component.html',
  styleUrls: ['./res-control-login.component.css'],
})
export class ResControlLoginComponent implements OnInit {
  Form!: FormGroup;
  resadmin!: SocialUser;
  submitted!: boolean;
  isLoader: Boolean = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private resService: ResturantControlServiceService,
    private tostr: ToastrService,
    private authService: SocialAuthService
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoader = false;
    }, 500);
    this.authService.authState.subscribe((user) => {
      console.log(user);
      this.resadmin = user;
      console.log(user);
      if (this.resadmin) {
        this.readminLoginWithGoogle(user);
      }
    });

    this.Form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  readminLoginWithGoogle(resadmin: any) {
    this.resService.resAdminLoginWothGoogle(resadmin).subscribe(
      (res: any) => {
        let token = res.token;
        this.tostr.success('Success Fully Loggined');
        localStorage.setItem('ResadminisLoggedIN', 'res_adminis_login_true');
        localStorage.setItem('resadmin', token);
        localStorage.setItem('resId', res.resId);

        RestaurantControlEmitter.resEmitter.emit(true);
        this.router.navigate(['/']);
      },
      (err) => {
        console.log('error');

        this.tostr.error(err.error.message);
        let localdata = localStorage.getItem('resadmin');
        if (localdata) localStorage.removeItem('resadmin');
      }
    );
  }
  resControlLogin() {
    let LoginData = this.Form.getRawValue();
    if (LoginData) {
      this.resService.LoginController(LoginData).subscribe(
        (res: any) => {
          this.router.navigate(['/']);

          let token = res.token;
          this.tostr.success('Success Fully Loggined');
          localStorage.setItem('ResadminisLoggedIN', 'res_admin_is_login_true');
          localStorage.setItem('resadmin', token);          
        localStorage.setItem('resId', res.resId);

          RestaurantControlEmitter.resEmitter.emit(true);
        },
        (err) => {
          this.tostr.error(err.error.message);
           localStorage.removeItem('resadmin');
        }
      );
    }
  }
}
