import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SuperAdminEmitter } from '../../emitters/emitters';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  athendication: boolean = false;
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    SuperAdminEmitter.Emitter.subscribe((auth: boolean) => {
      console.log(this.athendication);
      console.log('emit');
      this.athendication = auth;
      console.log(auth);
    });
  }

  superADminLogout() {
    this.http
      .get('http://localhost:5000/superadmin/logoutSuperAdmin', {
        withCredentials: true,
      })
      .subscribe(
        () => {
          SuperAdminEmitter.Emitter.emit(false);
          localStorage.removeItem('isLoggedIN');
          localStorage.removeItem('superadmin');

          this.router.navigate(['/login']);
        },
        (err) => console.log(err)
      );
  }
}
