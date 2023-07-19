import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiningServicesService } from 'projects/dining-app/src/app/core/services/dining-services.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private diningService:DiningServicesService,private router:Router) {}
  ngOnInit(): void {}
  logoutStaff() {
    
    this.diningService.logoutStaff().subscribe((res) => {
      console.log(res);
      localStorage.removeItem("token")
      this.router.navigate(['/diningLogin']);
    })
  }
}
