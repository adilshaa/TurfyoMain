import { createAction, props } from '@ngrx/store';
import { staffsStructure } from '../models/staffs';
export const fetchStaffsData = createAction(
  '[ACTION to Staffs Data] API STAFF'
);

export const reciveStaffsData = createAction(
  '[ACTION retrive Staffs Data] API STAFF',
  props<{ staffsData: staffsStructure[] }>()
);






