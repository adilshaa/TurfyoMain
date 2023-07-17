import { Component, OnInit } from '@angular/core';
import { ResturantControlServiceService } from '../../../core/services/resturant-control-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
// import { Foodsstructure } from 'projects/restaurant-control-app/src/app/core/models/foods';
// import { FoodsDatas } from 'projects/restaurant-control-app/src/app/core/store/res-admin.selector';
// import { fetchFoodsData } from 'projects/restaurant-control-app/src/app/core/store/res-admin.actions';

@Component({
  selector: 'app-list-foods',
  templateUrl: './list-foods.component.html',
  styleUrls: ['./list-foods.component.css'],
})
export class ListFoodsComponent implements OnInit {
  AddFood!: FormGroup;
  selectedFile!: File;
  isLoader: Boolean = true;

  // foodsData = this.resStore.pipe(select(FoodsDatas));

  constructor(
    private resService: ResturantControlServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient // private resStore: Store<{ foodsData: Foodsstructure[] }>
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoader = false;
    }, 500);
    // this.resStore.dispatch(fetchFoodsData());
    this.AddFood = this.formBuilder.group({
      dishName: '',
      dishDescription: '',
      dishCategory: '',
      dishPrice: '',
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  addFoods() {
    let foodsData = this.AddFood.getRawValue();

    const formData: FormData = new FormData();
    formData.append('dishName', foodsData.dishName);
    formData.append('dishDescription', foodsData.dishDescription);
    formData.append('dishCategory', foodsData.dishCategory);
    formData.append('dishPrice', foodsData.dishPrice);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    console.log(formData);

    this.http
      .post('http://localhost:5000/resadmin/addfood', formData, {
        withCredentials: true,
      })
      .subscribe(
        (result) => {
          this.router.navigate(['.']);
        },
        (err) => {
          console.log(err.error.message);
        }
      );
  }
}
