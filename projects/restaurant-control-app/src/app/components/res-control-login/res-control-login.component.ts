import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  submitted!: boolean;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private resService: ResturantControlServiceService,
    private tostr: ToastrService
  ) {}
  ngOnInit(): void {
    const isSuperAdmin = localStorage.getItem('ResadminisLoggedIN');
    if (isSuperAdmin) {
      console.log(isSuperAdmin);
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/controllersLogin']);
    }

    this.Form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  resControlLogin() {
    let LoginData = this.Form.getRawValue();
    if (LoginData) {
      this.resService.LoginController(LoginData).subscribe(
        (res: any) => {
          let token = res.token;
          this.tostr.success('Success Fully Loggined');
          localStorage.setItem('ResadminisLoggedIN', 'res admin is login true');
          localStorage.setItem('resadmin', token);
            RestaurantControlEmitter.resEmitter.emit(true);

          this.router.navigate(['/']);
        },
        (err) => {
          this.tostr.error(err.error.message);
          let localdata = localStorage.getItem('resadmin');
          if (localdata) {
          let localdata = localStorage.removeItem('resadmin');
          }
        }
      );
    }
  }
}