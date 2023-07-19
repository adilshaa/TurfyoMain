export interface foodsStructure {
  name: string;
  description: string;
  image: string;
  price: number;
  status:boolean,
  _id: string;
}

export interface Item {
   itemName: string;
   itemType: string;
   restaurantName: string;
   location: string;
   price: number;
   vote: number;
}