import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ResturantControlServiceService } from '../../core/services/resturant-control-service.service';

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
    private resService: ResturantControlServiceService
  ) {}
  ngOnInit(): void {
    this.Form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  resControlLogin() {
    let LoginData = this.Form.getRawValue();
    if (LoginData) {
      this.resService.LoginController(LoginData).subscribe((res:any) => {
        let token=res.token
        localStorage.setItem('ResadminisLoggedIN', 'res admin is login true');
        localStorage.setItem('resadmin',token);
        this.router.navigate(['/']);
      });
    }
  }
}
