import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResturantControlServiceService } from '../../../../core/services/resturant-control-service.service';

@Component({
  selector: 'app-addstaffs',
  templateUrl: './addstaffs.component.html',
  styleUrls: ['./addstaffs.component.css'],
  animations: [],
})
export class AddstaffsComponent implements OnInit {
  staffData!: FormGroup;
  submitted:any
  constructor(
    private formBulider: FormBuilder,
    private resService: ResturantControlServiceService
  ) {}
  ngOnInit(): void {
    this.staffData = this.formBulider.group({
      employeeName: new FormControl('', [Validators.required]),
      employeePlace: new FormControl('', [Validators.required]),
      employeeEmail: new FormControl('', [Validators.required]),
      employeeAge: new FormControl('', [Validators.required]),
      employeeNumber: new FormControl('', [Validators.required]),
      employeeDataOFBirth: new FormControl('', [Validators.required]),
      employeeRole: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  addStaffs() {
    this.submitted = true;
    if (this.staffData.invalid) {
      return;
    }
    let staffsInfromation = this.staffData.getRawValue();
    console.log(staffsInfromation);

    this.resService.RegisterStaffs(staffsInfromation);
  }
}
