import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { KitchenServiceService } from 'projects/kitchen-app/src/app/core/services/kitchen-service.service';
import { PosServiceService } from '../../core/services/pos-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitted!: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private _posService: PosServiceService,
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
  pos_Login() {
    let loginData = this.form.getRawValue();
    this._posService.staffLogin(loginData).subscribe(
      (res:any) => {
        this.router.navigate(['/']);
        localStorage.setItem('pos-staffs', 'true_and_verifyed');
        localStorage.setItem('token', res.token);
        localStorage.setItem('resId', res.resId);
      },
      (err) => console.log(err)
    );
  }
}
