import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-res-control-login',
  templateUrl: './res-control-login.component.html',
  styleUrls: ['./res-control-login.component.css'],
})
export class ResControlLoginComponent implements OnInit, OnDestroy {
  Form!: FormGroup;
  private componentDestroyed$ = new Subject<void>();

  resadmin!: SocialUser;
  submitted!: boolean;
  isLoader: Boolean = true;
  loginDistroy!: Subscription;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private resService: ResturantControlServiceService,
    private tostr: ToastrService,
    private authService: SocialAuthService
  ) {}
  ngOnInit(): void {
    let resId = localStorage.getItem('resadmin');
    setTimeout(() => {
      this.isLoader = false;
    }, 500);
    
    if (!resId) {
      this.loginDistroy = this.authService.authState
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe((user) => {
          this.resadmin = user;
          if (this.resadmin) {
            this.readminLoginWithGoogle(user);
          }
        });
    }
    this.Form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  readminLoginWithGoogle(resadmin: any) {
    this.resService.resAdminLoginWothGoogle(resadmin).subscribe(
      (res: any) => {
        this.router.navigate(['/']);
        let token = res.token;
        localStorage.setItem('ResadminisLoggedIN', 'res_adminis_login_true');
        localStorage.setItem('resadmin', token);
        localStorage.setItem('resId', res.resId);
        RestaurantControlEmitter.resEmitter.emit(true);
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
  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
