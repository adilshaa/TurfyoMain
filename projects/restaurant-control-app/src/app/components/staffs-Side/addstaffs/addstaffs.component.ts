import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ResturantControlServiceService } from '../../../core/services/resturant-control-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addstaffs',
  templateUrl: './addstaffs.component.html',
  styleUrls: ['./addstaffs.component.css'],
  animations: [],
})
export class AddstaffsComponent implements OnInit {
  staffData!: FormGroup;
  submitted: any;
  isLoader: Boolean = true;

  constructor(
    private formBulider: FormBuilder,
    private resService: ResturantControlServiceService,
    private tostr: ToastrService,
    private router:Router
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoader = false;
    }, 500);
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
     this.resService.RegisterStaffs(staffsInfromation).subscribe(
      (res) => {
         this.tostr.success('Staff registration completed');
         this.router.navigate(['/staffs']);
      },
      (err) => {
    this.submitted = false;

      console.log(err.error.message);

        this.tostr.warning(err.error.message);
      }
    );
  }
}
