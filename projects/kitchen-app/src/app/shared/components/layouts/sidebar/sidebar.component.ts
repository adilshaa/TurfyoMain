import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KitchenServiceService } from 'projects/kitchen-app/src/app/core/services/kitchen-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private kitchenService: KitchenServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  logoutStaff() {
    this.kitchenService.logoutStaff().subscribe((res) => {
      localStorage.removeItem('token');
      this.router.navigate(['/kitchenLogin']);
    });
  }
}
