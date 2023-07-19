import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'projects/dining-app/src/app/core/models/foods';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit{
  isFormVisible = true;
  formControlButton = 'Hide';

  foodItemForm!: FormGroup;

  listOfItem: Array<Item> = [];

  constructor(private fromBuilder: FormBuilder) {}

  ngOnInit() {
    this.foodItemForm = this.fromBuilder.group({
      itemName: ['', [Validators.required, Validators.pattern(/^([^0-9]*)$/)]],
      itemType: ['', [Validators.required, Validators.pattern(/^([^0-9]*)$/)]],
      restaurantName: [
        '',
        [Validators.required, Validators.pattern(/^([^0-9]*)$/)],
      ],
      location: ['', [Validators.required]],
      price: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^[0-9]*$/),
        ],
      ],
      vote: [-2],
    });
  }

  get itemName() {
    return this.foodItemForm.get('itemName');
  }
  get itemType() {
    return this.foodItemForm.get('itemType');
  }
  get restaurantName() {
    return this.foodItemForm.get('restaurantName');
  }
  get location() {
    return this.foodItemForm.get('location');
  }
  get price() {
    return this.foodItemForm.get('price');
  }

  toggleForm(value: string) {
    if (value === 'Show') {
      this.formControlButton = 'Hide';
    } else {
      this.formControlButton = 'Show';
    }

    this.isFormVisible = !this.isFormVisible;
  }

  onSubmitFoodItem() {
    this.listOfItem.push(this.foodItemForm.value);
  }

  like(value: string) {
    this.listOfItem.filter((v) => v.itemName == value)[0].vote++;
  }
 
  dislike(value: string) {
    this.listOfItem.filter((v) => v.itemName == value)[0].vote--;
  }
}
