import { createReducer, on } from '@ngrx/store';
import { staffsStructure } from '../models/staffs';

import { fetchStaffsData, reciveStaffsData } from './res-admin.actions';

export const initialStattsStaffs: staffsStructure[] = [];
export const _staffsDetails = createReducer(
  initialStattsStaffs,
  on(reciveStaffsData, (state, { staffsData }) => {

    return [...staffsData];
  })
);

export const staffsDetails = (state: any, action: any) => {
  return _staffsDetails(state, action);
};


