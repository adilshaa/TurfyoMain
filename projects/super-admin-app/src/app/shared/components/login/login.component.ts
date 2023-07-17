import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../core/services/service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SuperAdminEmitter } from '../../emitters/emitters';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  url: string = "http://localhost:5000";
  form!: FormGroup;
  error?: string = "";
  submitted:boolean=false;
  constructor(
    private servive: ServiceService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
  this.submitted = false;

    this.form = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required,Validators.minLength(4)]),
    });

    const isSuperAdmin = localStorage.getItem("isLoggedIN");
    if (isSuperAdmin) {
      this.router.navigate(["/"]);
      SuperAdminEmitter.Emitter.emit(true);
    } else {
      SuperAdminEmitter.Emitter.emit(false);
      this.router.navigate(["/login"]);
    }
  }
  loginSuperAdmin() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    let superAdmin = this.form.getRawValue();

    this.servive.LoginSuperDamin(superAdmin);
  }
}
