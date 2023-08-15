import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DiningServicesService } from 'projects/dining-app/src/app/core/services/dining-services.service';
import { KitchenServiceService } from 'projects/kitchen-app/src/app/core/services/kitchen-service.service';

@Component({
  selector: 'app-kitchen-login',
  templateUrl: './kitchen-login.component.html',
  styleUrls: ['./kitchen-login.component.css'],
})
export class KitchenLoginComponent implements OnInit {
  submitted: boolean = false;
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private kitchenService: KitchenServiceService,
    private tostr:ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }
  KitchenLogin() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    let loginData = this.form.getRawValue();
    this.kitchenService.staffLogin(loginData).subscribe(
      (res: any) => {
        this.router.navigate(['/']);
        localStorage.setItem('kitchen-staffs', ' true_and_verifyed');
        localStorage.setItem('token', res.token);
        localStorage.setItem('resId', res.resId);

      },
      (err) => {
        this.tostr.error(err.error.message)
        console.log(err.error.message);
        this.router.navigate(['/kitchenLogin']);
      }
    );
  }
}
