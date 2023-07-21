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
@Component({
  selector: 'app-dining-login',
  templateUrl: './dining-login.component.html',
  styleUrls: ['./dining-login.component.css'],
})
export class DiningLoginComponent implements OnInit {
  submitted: boolean = false;
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private diningService: DiningServicesService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    let key = localStorage.getItem('dining-staffs');
    if (key) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/diningLogin']);
    }
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }
  diningLogin() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let Logindata = this.form.getRawValue();
    this.diningService.diningLogin(Logindata).subscribe(
      (res: any) => {
        this.router.navigate(['/']);
        localStorage.setItem('dining-staffs', 'true_and_verifyed');
        localStorage.setItem('token', res.token);
        localStorage.setItem('resId', res.resId);
      },
      (err) => {
        this.toastr.error(err.error.message)
      }
    );
  }
}
