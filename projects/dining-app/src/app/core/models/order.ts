export interface Food {
  name: string;
  description?: string;
  category?: string;
  price?: number;
  image: string;
  status?: boolean;
  stock?: number;
  resturantId: Restaurant;
}

export interface Restaurant {
  name: string;
  place: string;
  owner_name: string;
  owner_email: string;
  owner_number: string;
}

export interface Staff {
  username: string;
  place: string;
  number: string;
  email: string;
  owner_number: string;
}
export interface Table {
  table_Name: string;
  table_No: string;
  table_status: string;
}

export interface Restaurant {
  name: string;
  place: string;
  owner_name: string;
  owner_email: string;
  owner_number: string;
}
export interface Order {
  _id: string;
  tableId: Table;
  staffId: Staff;
  resId: Restaurant;
  foods: OrderFoods[];
  total_price?: number;
  order_status?: string;
  expiresAt?: Date;
}
export interface OrderFoods {
  food_id: Food;
  food_quantity: number;
  food_totalprice: number;
  note: string;
}
