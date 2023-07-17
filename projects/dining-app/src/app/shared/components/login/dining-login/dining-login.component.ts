import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
  diningLogin() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    let Logindata = this.form.getRawValue();
    this.diningService.diningLogin(Logindata).subscribe(
      (res) => {
        this.router.navigate(['/']);
      },
      (err) => this.router.navigate(['/diningLogin'])
    );
  }
}
