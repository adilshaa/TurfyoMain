import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../core/services/service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SuperAdminEmitter } from '../../emitters/emitters';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  url: string = 'http://localhost:5000';
  form!: FormGroup;
  error?: string = '';
  constructor(
    private servive: ServiceService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      number: '',
      password: '',
    });

    const isSuperAdmin = localStorage.getItem('isLoggedIN');
    if (isSuperAdmin) {
      this.router.navigate(['/']);
      SuperAdminEmitter.Emitter.emit(true);
    } else {
      SuperAdminEmitter.Emitter.emit(false);
      this.router.navigate(['/login']);
    }
  }
  loginSuperAdmin() {
    let superAdmin = this.form.getRawValue();
    if (superAdmin.name.trim() === '') {
      this.error = 'please enter your name';
    } else if (superAdmin.email.trim() == '') {
      this.error = 'Please enter your email';
    } else if (superAdmin.number == '') {
      this.error = 'Please enter your number';
    } else if (superAdmin.password == '') {
      this.error = 'Please enter your password';
    } else {
      console.log(superAdmin);
      this.servive.LoginSuperDamin(superAdmin);
    }
  }
}
