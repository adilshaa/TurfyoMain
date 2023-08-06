import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResturantControlServiceService } from '../../../core/services/resturant-control-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import { io } from 'socket.io-client';
import { NotificationsComponent } from '../../../shared/components/notifications/notifications.component';

@Component({
  selector: 'app-list-foods',
  templateUrl: './list-foods.component.html',
  styleUrls: ['./list-foods.component.css'],
})
export class ListFoodsComponent implements OnInit {
  @ViewChild('myModal') myModal!: ElementRef;
  @ViewChild('myModal1') myModal1!: ElementRef;

  AddFood!: FormGroup;
  selectedFile!: File;
  selectedFileEditngFood!: File;
  editFoodForm!: FormGroup;
  isLoader: Boolean = true;
  socket = io('http://localhost:5000');
  foodData: any[]=[];
  empty: boolean = false;
  emptyCart: boolean = false;
  currentFood: any;
  submition: boolean = false;
  FoodCategory!: any[];
  foodCount!: number 
  categoryName!:string
  constructor(
    private resService: ResturantControlServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient, // private resStore: Store<{ foodsData: Foodsstructure[] }>
    private notificatons: NotificationsComponent,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.formGroups();
    this.loadFoods();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onFileSelectedForEdit(event: Event, id: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileEditngFood = input.files[0];
      // You can now use this 'file' to perform further operations like uploading to a server.
      this.resService
        .editFoodImage(
          id,
          this.selectedFileEditngFood,
          this.selectedFileEditngFood.name
        )
        .subscribe(
          (res) => {
            console.log(res);
          },
          (err) => console.log(err)
        );
      console.log('Selected file:', this.selectedFileEditngFood);
    }
  }
  loadFoods() {
    let resId = localStorage.getItem('resId');
    this.socket.emit('listFoods', resId);
    const showFoods$ = fromEvent(this.socket, 'showFoods');
    const subscription = showFoods$.subscribe(
      (data) => {
        this.foodData = data.fooddata;
        if (this.foodData[0] == null) {
          this.empty = true;
        } else {
          this.empty = false;
        }

        this.FoodCategory = data.category;
        console.log(this.foodData);
      },

      (error) => {
        console.error('An error occurred:', error);
      }
    );

    setTimeout(() => {
      this.isLoader = false;
    }, 500);
  }
  formGroups() {
    this.AddFood = this.formBuilder.group({
      dishName: '',
      dishDescription: '',
      dishCategory: '',
      dishPrice: '',
    });
    this.editFoodForm = this.formBuilder.group({
      name: '',
      price: '',
    });
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
          console.log(result);
          this.closeModal();
        },
        (err) => {
          console.log(err.error.message);
        }
      );
  }
  addCategory() {
    let categorydata = this.editFoodForm.getRawValue();
    if (categorydata.name == '') {
      this.notificatons.normalWarninigNotification(
        'please fill the category field'
      );
    } else {
      this.resService.addFoodCategory(categorydata).subscribe(
        (res) => {
          this.closeModal();
          const currentRoute = this.route.snapshot.routeConfig?.path;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([currentRoute]);
            });
        },
        (err) => {
          this.notificatons.normalErrorNotification(err.error.message);
          console.log(err);
        }
      );
    }
  }
  closeModal() {
    this.myModal.nativeElement.click();
    this.myModal1.nativeElement.click();
  }
  editFood(id: any) {
    let food = this.foodData.find((items) => items._id == id);
    if (food) {
      this.emptyCart = true;
      this.currentFood = food;
    } else {
      this.emptyCart = false;
    }
  }
  openEdit() {
    this.submition = true;
  }
  editFoodData(id: any) {
    let editedData = this.editFoodForm.getRawValue();
    console.log(editedData);

    this.resService.editFoodsCnt(editedData, id).subscribe(
      (res) => {
        console.log(res);
        this.submition = false;
      },
      (err) => console.log(err)
    );
  }
  catFilter(id: string) {
    this.resService.filterFood(id).subscribe((res:any) => {
      this.foodData = res.food
      this.foodCount = res.count
      if (res.food[0]) {
         this.categoryName = res.food[0].category.name;
      }
     
    });
    // this.foodData = this.foodData.filter((item) => {
    //   return item.category === id;
    // });
    // console.log(this.foodData);
  }
}
