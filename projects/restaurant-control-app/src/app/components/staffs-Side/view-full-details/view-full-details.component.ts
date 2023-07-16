import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResturantControlServiceService } from 'projects/restaurant-control-app/src/app/core/services/resturant-control-service.service';
import { RestaurantControlEmitter } from '../../../shared/emmiter/res-control-emmitter';

@Component({
  selector: 'app-view-full-details',
  templateUrl: './view-full-details.component.html',
  styleUrls: ['./view-full-details.component.css'],
})
export class ViewFullDetailsComponent implements OnInit {
  StaffsForm!: FormGroup;
  restaurantId: any;
  staffsData$!: any;
  isEdit!: boolean;
  constructor(
    private resService: ResturantControlServiceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    let data = this.resService
      .getStaff(this.restaurantId)
      .subscribe((res: any) => {
        this.staffsData$ = res;
      });

    this.StaffsForm = this.formBuilder.group({
      employeeName: '',
      employeePlace: '',
      employeeEmail: '',
      employeeAge: '',
      employeeNumber: '',
      employeeDataOFBirth: '',
      employeeRole: '',
    });
  }
  saveEdit(id: any) {
    let updataData = this.StaffsForm.getRawValue();

    this.resService.saveEditOfStaffs(id, updataData).subscribe(
      (res) => {
        this.router.navigate([this.router.url]);
        RestaurantControlEmitter.resEmitter.emit(true);
        this.isEdit = false;
      },
      (err) => {
        RestaurantControlEmitter.resEmitter.emit(false);
      }
    );
  }
  cheakStatus() {
    this.isEdit = true;
  }

  removeStaffs(id: any) {
    this.resService.removeStaffs(id);
  }
}
