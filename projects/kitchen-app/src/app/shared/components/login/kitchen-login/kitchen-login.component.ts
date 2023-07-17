import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DiningServicesService } from 'projects/dining-app/src/app/core/services/dining-services.service';

@Component({
  selector: 'app-kitchen-login',
  templateUrl: './kitchen-login.component.html',
  styleUrls: ['./kitchen-login.component.css'],
})
export class KitchenLoginComponent implements OnInit {
  submitted: boolean = false;
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    
  ) { }
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
  }
}
