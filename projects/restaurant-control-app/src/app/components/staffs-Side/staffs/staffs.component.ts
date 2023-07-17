import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResturantControlServiceService } from '../../../core/services/resturant-control-service.service';
import { Store, select } from '@ngrx/store';
import { staffsStructure } from 'projects/restaurant-control-app/src/app/core/models/staffs';
import { staffsDatas } from 'projects/restaurant-control-app/src/app/core/store/res-admin.selector';
import { fetchStaffsData } from 'projects/restaurant-control-app/src/app/core/store/res-admin.actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.css'],
})
export class StaffsComponent implements OnInit {
  staffData!: FormGroup;
  staffsData$ = this.resStore.pipe(select(staffsDatas));
    isLoader: Boolean = true;

  constructor(
    private formBulider: FormBuilder,
    private resService: ResturantControlServiceService,
    private router: Router,
    private resStore: Store<{ staffsData: staffsStructure[] }>
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoader = false;
    }, 1900);
    this.resStore.dispatch(fetchStaffsData());
    this.staffData = this.formBulider.group({
      employeeName: '',
      employeePlace: '',
      employeeEmail: '',
      employeeAge: '',
      employeeNumber: '',
      employeeDataOFBirth: '',
      employeeRole: '',
      password: '',
    });
  }

  addStaffs(id: any) {
    let staffsInfromation = this.staffData.getRawValue();
    this.resService.RegisterStaffs(staffsInfromation);
  }
  ViewDetails(id: string) {
    this.router.navigate(['/editStaffs', id]);
  }
}
