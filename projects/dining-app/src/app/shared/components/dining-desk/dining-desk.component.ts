import { Component, OnInit } from '@angular/core';
import { DiningServicesService } from '../../../core/services/dining-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dining-desk',
  templateUrl: './dining-desk.component.html',
  styleUrls: ['./dining-desk.component.css'],
})
export class DiningDeskComponent implements OnInit {
  constructor(
    private diningService: DiningServicesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.diningService.verifyStaffs().subscribe(
      (res) => {
        
      },
      (err) => {
        console.log(err);
        localStorage.removeItem('dining-staffs');
        this.router.navigate(['/diningLogin']);
      }
    );
   
  }
}

