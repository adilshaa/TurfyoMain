import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ResturantControlServiceService } from '../../../core/services/resturant-control-service.service';
import { RestaurantControlEmitter } from '../../emmiter/res-control-emmitter';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  Form!: FormGroup;
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private service: ResturantControlServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.Form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      role: new FormControl('', Validators.required),
    });
  }
  staffsLogin() {
    this.submitted = true;
    if (this.Form.invalid) {
      return;
    }

    let staffsData = this.Form.getRawValue();
    this.http
      .post('http://localhost:5000/resadmin/verifyStaffs', staffsData, {
        withCredentials: true,
      })
      .subscribe(
        (result: any) => {
          this.toastr.success(result.error.message);
          let data = {
            result: result._id,
          };
          const queryParams = new URLSearchParams(data).toString();
          let resadminUrl = 'http://localhost:3200';
          let diningUrl = 'http://localhost:2200';
          let posUrl = 'http://localhost:5200';
          let kitchenUrl = 'http://localhost:1200';
          if (result.role == 'cheffs') {
            window.open(`${kitchenUrl}?${queryParams}`);
          }
          window.open(`${resadminUrl}?${queryParams}`);
          localStorage.setItem('ResadminisLoggedIN', 'res admin is login true');
        },
        (err) => {
          this.toastr.error(err.error.message);

        }
      );
  }
}
