export interface restaurantModel {
  _id: string;
  name: string;
  place: string;
  owner_name: string;
  owner_email: string;
  password: string;
  owner_number: string;
  poc_doc: string;
  registration_data: string;
  registration_id: string;
  restaurant_no: string;
  license: string;
  status: boolean;
}

export interface FullRestaurantDetails {
  _id: string;
  name: string;
  place: string;
  owner_name: string;
  owner_email: string;
  password: string;
  owner_number: string;
  poc_doc: string;
  registration_data: string;
  registration_id: string;
  restaurant_no: string;
  license: string;
  status: any;
}
